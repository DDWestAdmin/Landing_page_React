import { useEffect, useState } from "react";

const autos = [
	{
		src: "/images/autos/Ford_Mustang_GT.jpeg",
		alt: "Ford Mustang GT",
		titulo: "Ford Mustang GT",
	},
	{
		src: "/images/autos/Chevrolet_Camaro.jpeg",
		alt: "Chevrolet Camaro",
		titulo: "Chevrolet Camaro",
	},
	{
		src: "/images/autos/Honda_Civic.jpeg",
		alt: "Honda Civic",
		titulo: "Honda Civic",
	},
	{
		src: "/images/autos/Toyota_Corolla.jpeg",
		alt: "Toyota Corolla",
		titulo: "Toyota Corolla",
	},
];

function Carrusel() {
	const [indiceActivo, setIndiceActivo] = useState(0);

	useEffect(() => {
		const intervalo = setInterval(() => {
			setIndiceActivo((indiceActual) => (indiceActual + 1) % autos.length);
		}, 3500);

		return () => clearInterval(intervalo);
	}, []);

	const irAnterior = () => {
		setIndiceActivo((indiceActual) =>
			(indiceActual - 1 + autos.length) % autos.length
		);
	};

	const irSiguiente = () => {
		setIndiceActivo((indiceActual) => (indiceActual + 1) % autos.length);
	};

	return (
		<section className="carrusel" aria-label="Carrusel de autos">
			<div className="carrusel-ventana">
				<div
					className="carrusel-pista"
					style={{ transform: `translateX(-${indiceActivo * 100}%)` }}
				>
					{autos.map((auto) => (
						<article className="carrusel-slide" key={auto.titulo}>
							<img className="carrusel-imagen" src={auto.src} alt={auto.alt} />
							<div className="carrusel-caption">
								<h2>{auto.titulo}</h2>
							</div>
						</article>
					))}
				</div>

				<button
					className="carrusel-control prev"
					onClick={irAnterior}
					aria-label="Imagen anterior"
				>
					‹
				</button>
				<button
					className="carrusel-control next"
					onClick={irSiguiente}
					aria-label="Imagen siguiente"
				>
					›
				</button>
			</div>

			<div className="carrusel-indicadores" aria-label="Indicadores del carrusel">
				{autos.map((auto, indice) => (
					<button
						key={auto.titulo}
						className={indice === indiceActivo ? "activo" : ""}
						onClick={() => setIndiceActivo(indice)}
						aria-label={`Ir a ${auto.titulo}`}
					/>
				))}
			</div>
		</section>
	);
}

export default Carrusel;
