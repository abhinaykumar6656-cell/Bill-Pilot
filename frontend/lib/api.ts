const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export interface BillUploadResponse {
  success: boolean;
  bill_id: string;
  filename: string;
  status: string;
  message: string;
  created_at: string;
}

/**
 * Upload a bill to the Bill Pilot backend.
 */
export async function uploadBill(
  file: File,
): Promise<BillUploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/bills/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    let errorMessage = "Failed to upload bill.";

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        errorMessage = errorData.detail;
      }
    } catch {
      // Backend didn't return JSON.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}