import lazyload from '../components/lazyload';

function getFlattenRoutes(routes: RouteItem[]): any {
  const mod = import.meta.glob('../pages/**/[a-z[]*.tsx');
  const res: any[] = [];

  function travel(_routes: RouteItem[]) {
    _routes.forEach((route) => {
      const key = route.path.replace(/^\//, '');

      if (key && !route.children) {
        route.component = lazyload(mod[`../pages/${key}/index.tsx`]);
        res.push(route);
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
}
export default getFlattenRoutes;
