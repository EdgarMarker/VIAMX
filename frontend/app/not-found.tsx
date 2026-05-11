import "./styles/404.scss";
import Link from "next/link";
import Svg from "./common/components/img/Svg";

const NotFound = () => {
  return (
    <main id="NotFound">
      <section className="section__404">
        <div className="column__1">
          <Svg variant="NotFound" />
          <h2>404</h2>
          <h1>Página no encontrada</h1>
          <p>
            Parece que te has perdido en el camino. La página que buscas no
            existe o ha sido movida a una nueva ubicación.
          </p>
          <Link href="/" className="btn btn__back">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
};
export default NotFound;
