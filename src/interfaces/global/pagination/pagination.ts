export interface IGlobalPaginationDto {
  current_page: number | null;
  total_page: number | null;
  total_data: number | null;
  limit?: number | null;
  next: string | null;
  prev: string | null;
}
