/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { CreateDeviceDto, DeleteDeviceDto, DeviceDto, WakeDeviceDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Device
   * @name DeviceGet
   * @request GET:/api/devices
   */
  deviceGet = (params: RequestParams = {}) =>
    this.request<DeviceDto[], any>({
      path: `/api/devices`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Device
   * @name DeviceCreate
   * @request POST:/api/devices
   */
  deviceCreate = (deviceDto: CreateDeviceDto, params: RequestParams = {}) =>
    this.request<DeviceDto, any>({
      path: `/api/devices`,
      method: "POST",
      body: deviceDto,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Device
   * @name DeviceDelete
   * @request DELETE:/api/devices/{id}
   */
  deviceDelete = (id: number, dto: DeleteDeviceDto, params: RequestParams = {}) =>
    this.request<File | null, any>({
      path: `/api/devices/${id}`,
      method: "DELETE",
      body: dto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Device
   * @name DeviceWake
   * @request POST:/api/devices/{id}/wake
   */
  deviceWake = (id: number, dto: WakeDeviceDto, params: RequestParams = {}) =>
    this.request<File | null, any>({
      path: `/api/devices/${id}/wake`,
      method: "POST",
      body: dto,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Device
   * @name DeviceIsDeviceOn
   * @request GET:/api/devices/{id}/status
   */
  deviceIsDeviceOn = (id: number, params: RequestParams = {}) =>
    this.request<boolean, any>({
      path: `/api/devices/${id}/status`,
      method: "GET",
      format: "json",
      ...params,
    });
}
