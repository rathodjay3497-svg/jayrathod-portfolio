import type { ContactFormData, ApiResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function submitContact(
  data: ContactFormData
): Promise<ApiResponse<{ id: number }>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        error: json.detail ?? "Something went wrong. Please try again.",
        status: res.status,
      };
    }

    return { data: { id: json.id }, status: res.status };
  } catch {
    return { error: "Network error. Please check your connection.", status: 0 };
  }
}
