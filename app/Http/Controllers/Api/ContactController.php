<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->json()->all();

        if (!empty($data['website'])) {
            return response()->json(['status' => 'ok']);
        }

        $name    = trim($data['name'] ?? '');
        $email   = trim($data['email'] ?? '');
        $message = trim($data['message'] ?? '');

        if (!$name || !$email || !$message || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['status' => 'error', 'message' => 'Dados inválidos'], 422);
        }

        $contact = ContactMessage::create([
            'name'       => substr($name, 0, 255),
            'email'      => substr($email, 0, 255),
            'message'    => $message,
            'ip_address' => $request->ip(),
        ]);

        $this->sendEmail($contact);

        return response()->json(['status' => 'ok']);
    }

    private function sendEmail(ContactMessage $contact): void
    {
        try {
            $to = config('mail.contact_to', env('CONTACT_MAIL_TO', 'mario.braz.dev@gmail.com'));

            Mail::html($this->buildHtml($contact), function ($m) use ($contact, $to) {
                $m->to($to)
                  ->replyTo($contact->email, $contact->name)
                  ->subject("[MB Sistemas] Novo contato de {$contact->name}");
            });
        } catch (\Throwable $e) {
            logger()->error('ContactController mail error: ' . $e->getMessage());
        }
    }

    private function buildHtml(ContactMessage $contact): string
    {
        $name    = htmlspecialchars($contact->name);
        $email   = htmlspecialchars($contact->email);
        $message = nl2br(htmlspecialchars($contact->message));

        return <<<HTML
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#08090d;color:#e2e8f0;padding:32px;border-radius:12px;border:1px solid rgba(255,255,255,0.08)">
            <h2 style="color:#818cf8;margin:0 0 24px">Novo contato — MB Sistemas</h2>
            <p><strong>Nome:</strong> {$name}</p>
            <p><strong>Email:</strong> <a href="mailto:{$email}" style="color:#06b6d4">{$email}</a></p>
            <p><strong>Mensagem:</strong></p>
            <div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:16px;margin-top:8px">{$message}</div>
        </div>
        HTML;
    }
}
