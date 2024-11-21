export interface PaginatedResponse<T> {
    data: {
      data: T[];
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    };
    status: string;
    message: string;
  }