import { request } from "../utils/request";

export function getSubCategory(options = {}) {
  const params = new URLSearchParams();

  if (options.filter) {
    params.append("filter", JSON.stringify(options.filter));
  }
  if (options.page) params.append("page", options.page.toString());
  if (options.size) params.append("size", options.size.toString());
  if (options.search) params.append("search", options.search);
  if (options.sort) params.append("sort", options.sort);
  if (options.select) params.append("select", options.select);
  if (options.populate) params.append("populate", options.populate);
  if (options.populateSelect) {
    params.append("populateSelect", options.populateSelect);
  }

  return request({
    url: "/sub-category",
    method: "GET",
    params,
  });
}

export function createSubCategory(data) {
  return request({
    url: "/sub-category",
    method: "POST",
    data,
  });
}

export function updateSubCategory(id, data) {
  return request({
    url: `/sub-category/${id}`,
    method: "PATCH",
    data,
  });
}
