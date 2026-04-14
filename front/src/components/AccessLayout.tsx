export default function AccessLayout(props: any) {
  return (
    <div>
      <h1 className="text-h2 text-center">{props.title}</h1>
      <h2 className="text-h6 mb-10 text-center">{props.subtitle}</h2>
      <>{props.children}</>
    </div>
  );
}
