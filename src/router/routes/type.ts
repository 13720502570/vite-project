import type { RouteMeta, RouteRecordRaw } from 'vue-router'

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta: RouteMeta
  children?: AppRouteRecordRaw[]
}
