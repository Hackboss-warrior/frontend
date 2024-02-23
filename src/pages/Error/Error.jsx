import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
import { useNavigate } from "react-router-dom";
import "./Error.css";

const Error = () => {
  const [init, setInit] = useState(false);
  const navigate = useNavigate();

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {};

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#2d2d2d",
        },
        image:
          "url('https://cdn.discordapp.com/attachments/1161702199794090014/1204732598707027978/Recurso_4fakNews-white-logo-no-bg.png?ex=65e842aa&is=65d5cdaa&hm=ca093eb100496a0d75e2b2c99e34f39557c7ae92da21dfadc261591d391bbef3&')",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "20%",
        opacity: 1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#b8b8b8",
        },
        links: {
          color: "#a9191f",
          distance: 350,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const handleClick = () => {
    navigate("/");
  };

  if (init) {
    return (
      <div className="mainErrorContent">
        <div className="box">
          <h1 className="title" onClick={() => handleClick("title")}>
            ¿Te has perdido?
          </h1>
          <button className="errorButton" onClick={() => navigate("/")}>
            Volver a noticias
          </button>
        </div>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </div>
    );
  }

  return <></>;
};

export default Error;
