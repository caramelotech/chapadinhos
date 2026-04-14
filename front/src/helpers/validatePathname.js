export default function validatePathname(pathname) {
  const list = ["/", "/access", "/access/signup"];
  return !list.includes(pathname);
}
