import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import MainNavigation from "../layout/MainNavigation";

import ErrorBlock from "../components/UI/ErrorBlock";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";
  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      message = error.data.message;
    } else if (error.status === 404) {
      title = "Not found!";
      message = "Could not find resource or page.";
    } else if (error.status === 500) {
      title = "Server error!";
      message = "An unexpected error occurred.";
    } else {
      message = error.data.message;
    }

    return (
      <>
        <MainNavigation isScrolled={true} />
        <ErrorBlock title={title} message={message}></ErrorBlock>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <div className="error-block" id="error-page">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong. Idk</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  } else {
    return <></>;
  }
}
export default ErrorPage;
