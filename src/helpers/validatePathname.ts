const PUBLIC_PATHS = ["/", "/access", "/access/signup"];

export default function validatePathname(pathname: string): boolean {
	return !PUBLIC_PATHS.includes(pathname);
}
