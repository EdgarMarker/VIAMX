import "./page.scss";
import Link from "next/link";
import Product2Card from "@/app/common/components/card/Product2Card";
import { getProducts2 } from "@/app/_domain/sanity";

type PageProps = {
    params: Promise<{ category: string }>;
};

const page = async ({ params }: PageProps) => {
    const { category } = await params;

    const products = await getProducts2();
    const data = products.filter(
        (product) =>
            product.general.ref_general_category?.general.slug.current === category
    );

    return (
        <main id="Product2Category">
            <section className="section__hero">
                <div className="column__1">
                    <div className="breadcrumbs">
                        <span>
                            <Link href="/productos2">Productos 2</Link>
                            {" / "}
                            <span className="is-disabled" aria-current="page">
                                {category}
                            </span>
                            {" / "}
                        </span>
                    </div>

                    <h1>
                        Productos en la categoría: <strong>{category}</strong>
                    </h1>
                </div>
            </section>

            <section className="section__products">
                <div className="column__1">
                    <div className="listado">
                        {data.length > 0 ? (
                            data.map((product, idx) => (
                                <Product2Card key={idx} data={product} />
                            ))
                        ) : (
                            <p>No hay productos en esta categoría.</p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default page;
