<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = ContactMessage::orderByDesc('created_at');

        if ($request->query('filter') === 'unread') {
            $query->where('is_read', false);
        }

        $messages = $query->paginate(20);

        return response()->json($messages);
    }

    public function show(ContactMessage $message): JsonResponse
    {
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }

        return response()->json($message);
    }

    public function destroy(ContactMessage $message): JsonResponse
    {
        $message->delete();

        return response()->json(['status' => 'ok']);
    }

    public function bulkDestroy(Request $request): JsonResponse
    {
        $ids = $request->input('ids', []);
        ContactMessage::whereIn('id', $ids)->delete();

        return response()->json(['status' => 'ok']);
    }

    public function unreadCount(): JsonResponse
    {
        return response()->json(['count' => ContactMessage::where('is_read', false)->count()]);
    }
}
