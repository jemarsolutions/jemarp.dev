import pool from "@/db/index";
import { Inquiry } from "@/types";
import { deleteInquiry, markInquiryRead } from "@/actions/inquiries";
import { Trash2, CheckCircle, MailOpen } from "lucide-react";
import DeleteConfirm from "@/components/DeleteConfirm";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const client = await pool.connect();
  let inquiries: Inquiry[] = [];
  try {
    const result = await client.query("SELECT * FROM inquiries ORDER BY created_at DESC");
    inquiries = result.rows as Inquiry[];
  } finally {
    client.release();
  }

  const unreadCount = inquiries.filter(i => !i.is_read).length;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-3">
          Inquiries Inbox
          {unreadCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-sm font-medium">
              {unreadCount} new
            </span>
          )}
        </h1>
        <p className="text-neutral-500 mt-2">Manage incoming messages and contact requests.</p>
      </header>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-12 text-center text-neutral-500">
            No inquiries yet. Your inbox is perfectly clean.
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div 
              key={inquiry.id} 
              className={`bg-white dark:bg-neutral-900 border rounded-xl p-6 transition-all ${
                inquiry.is_read 
                  ? "border-neutral-200 dark:border-neutral-800 opacity-70" 
                  : "border-brand/30 dark:border-brand/20 shadow-sm"
              }`}
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    {inquiry.name}
                    {!inquiry.is_read && <span className="h-2 w-2 rounded-full bg-brand" />}
                  </h3>
                  <a href={`mailto:${inquiry.email}`} className="text-sm font-medium text-brand hover:underline">
                    {inquiry.email}
                  </a>
                  <p className="text-xs text-neutral-400 mt-1">
                    {new Date(inquiry.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  {!inquiry.is_read && (
                    <form action={markInquiryRead.bind(null, inquiry.id)}>
                      <button type="submit" title="Mark as read" className="p-2 rounded-lg text-neutral-400 hover:text-emerald-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    </form>
                  )}
                  <form data-confirm="true" action={deleteInquiry.bind(null, inquiry.id)}>
                    <button type="submit" title="Delete message" className="p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-neutral-50 dark:bg-neutral-950 rounded-lg p-4 text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap text-sm border border-neutral-100 dark:border-neutral-800/50">
                {inquiry.message}
              </div>
            </div>
          ))
        )}
      </div>
      <DeleteConfirm />
    </div>
  );
}
