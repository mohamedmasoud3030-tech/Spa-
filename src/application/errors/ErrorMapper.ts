export function mapErrorToMessage(error: any): string {
  if (!error) return "حدث خطأ غير متوقع.";
  
  const code = error.code || error.message; // Fallback to message for simple inspection
  
  switch (code) {
    case "AUTH_NOT_CONFIGURED":
      return "لم يتم إعداد المصادقة بعد. يرجى إعداد قاعدة البيانات أولاً.";
    case "PREVIEW_READ_ONLY":
      return "وضع المعاينة (Preview) يسمح بالقراءة فقط. لا يمكن حفظ التعديلات.";
    case "UNAUTHORIZED":
    case "UNAUTHENTICATED":
      return "يرجى تسجيل الدخول والصلاحية مطلوبة للقيام بهذا الإجراء.";
    case "FORBIDDEN":
      return "ليس لديك الصلاحيات الكافية للقيام بهذا الإجراء.";
    case "NOT_FOUND":
      return "العنصر المطلوب غير موجود.";
    case "VALIDATION_ERROR":
      return "يوجد خطأ في البيانات المدخلة. يرجى مراجعتها والمحاولة مجدداً.";
    case "CONFLICT":
      return "تعارض في البيانات. العنصر ربما موجود مسبقاً.";
    case "INFRASTRUCTURE_ERROR":
      return "قاعدة البيانات غير متصلة.";
    case "INVALID_CREDENTIALS":
      return "بيانات الاعتماد غير صحيحة.";
    case "UNEXPECTED_ERROR":
    default:
      if (error.message && error.message.includes("not configured")) {
        return "لم يتم إعداد المصادقة بعد. يرجى إعداد قاعدة البيانات أولاً.";
      }
      return error.message || "حدث خطأ غير متوقع.";
  }
}
