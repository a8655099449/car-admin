import lazyload from '../components/lazyload';

function getFlattenRoutes(routes: RouteItem[]): any {
  const mod = import.meta.glob('../pages/**/[a-z[]*.tsx');
  const res: any[] = [];

  function travel(_routes: RouteItem[]) {
    _routes.forEach((route) => {
      const key = route.path.replace(/^\//, '');

      if (key && !route.children) {
        if (key === 'list/car/carAdd') {
          console.log(
            '👴2023-03-27 11:16:29 loadRoute.ts line:15',
            mod[`../pages/${key}/index.tsx`],
          );
        }

        const content = mod[`../pages/${key}/index.tsx`] || mod[`../pages/${key}.tsx`];

        route.component = lazyload(content);
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
