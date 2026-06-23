import {useState} from "react";
import ModalAuto from "./ModalAuto";

function Logos() {
    const [autoSeleccionado, setAutoSeleccionado] =
        useState(null);

    const autos = {
        Ford: {
            logo: '/images/logos/Ford.jpeg',
            img: '/images/autos/Ford_Mustang_GT.jpeg',
            desc: 'Ford Mustang GT 2022\n\n"Dosis diaria de Dopamina"\n\nMotor: \nV8 Ti-VCT de 5.0 litros\n\nPotencia: \n450 a 460 caballos de fuerza (HP),\ny un torque de 556 Nm,\ncon transmisión automática de 10 velocidades.\n\nConsumo de Gasolina:\n5.5 a 6.0 Km/l en ciudad,\n11.5 Km/l en carretera, y\n8.1 Km/l ciclo Mixto.'
        },

        Chevrolet: {
            logo: '/images/logos/Chevrolet.jpeg',
            img: '/images/autos/Chevrolet_Camaro.jpeg',
            desc: 'Chevrolet CamaroZL1 2022\n\n"Toma el control hasta los extremos"\n\nMotor:\n6.2 LT V8 Supercargado\n\nPotencia:\n650 caballos de fuerza (HP),\ny un torque de 881 Nm.\n\nConsumo de Gasolina:\n5.9 K,/l en ciudad,\n8.5 Km/l en carretera,\n6.8 Km/l ciclo Mixto.'
        },

        Honda: {
            logo: '/images/logos/Honda.jpeg',
            img: '/images/autos/Honda_Civic.jpeg',
            desc: 'Honda Civic RS 2021\n\n"El poder de los Sueños"\n\nMotror:\nDOCH I-VTEC de 1.5 litros Turbo,\n4 cilindros.\n\nPotencia:\n180 caballos de fuerza (HP),\ny un torque de 240 Nm.\n\nConsumo de Gasolina:\n11.1 Km/l en ciudad,\n18.5 Km/l en carretera, y\n15.6 Km/l ciclo Mixto.'
        },

        Toyota: {
            logo: '/images/logos/Toyota.jpeg',
            img: '/images/autos/Toyota_Corolla.jpeg',
            desc: 'Toyota Corolla Hatchback 2026\n\n"Vayamos a Lugares"\n\nMotor:\nDynamic Force de 2.0 litros,\n4 cilindros.\n\nPotencia:\n169 caballos de potencia (HP),\ny un torque de 205 Nm.\n\nConsumo de Gasolina:\n13.6 Km/l en ciudad,\n17.4 Km/l en carretera,\n14.8 Km/l ciclo Mixto.'
        }
    };
    
    return (
        <div className="logos">
            {Object.keys(autos).map((marca) =>(
                <div 
                key={marca} 
                className="logo"
                onClick={() => setAutoSeleccionado(autos[marca])}>
                    <img src={autos[marca].logo} alt="" />
                    {marca}
                </div>
            ))}

            {autoSeleccionado && (
                <ModalAuto
                    auto={autoSeleccionado}
                    cerrar={() => setAutoSeleccionado(null)}
                />  
            )}
        </div>
    );      
}

export default Logos;