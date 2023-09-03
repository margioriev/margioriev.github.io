import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div id='error-page'>
      <h1>o______o</h1>
      <p>Andas perdid@? Vuelve a home</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
