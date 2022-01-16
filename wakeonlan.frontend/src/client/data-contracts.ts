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

export interface DeviceDto {
  /** @format int32 */
  id: number;
  name: string;
  macAddress: string;
}

export interface CreateDeviceDto {
  name: string;

  /** @pattern ^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$ */
  macAddress: string;
  password: string;
}

export interface DeleteDeviceDto {
  password: string;
}

export interface WakeDeviceDto {
  password: string;
}
