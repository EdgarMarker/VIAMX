import { gsap } from "gsap";

type AnimTarget = string | HTMLElement | (HTMLElement | null)[] | null;

type StartHeroArgs = {
    breadEl?: AnimTarget;
    h1El?: AnimTarget;
    h2El?: AnimTarget;
    pEl?: AnimTarget;
    imgEl?: AnimTarget;
    btnEl?: AnimTarget;
    sliderEl?: AnimTarget;
};

export const startHero = (args: StartHeroArgs = {}) => {
    const {
        breadEl = null,
        h1El = null,
        h2El = null,
        pEl = null,
        imgEl = null,
        btnEl = null,
        sliderEl = null,
    } = args;

    const tl = gsap.timeline();

    const hasTarget = (target: AnimTarget) => {
        if (!target) return false;
        if (typeof target === "string") return true;
        if (Array.isArray(target)) return target.some(el => el !== null);
        return true;
    };

    if (hasTarget(breadEl)) {
        tl.to(breadEl as any, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0);
    }

    if (hasTarget(h1El)) {
        tl.to(h1El as any, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");
    }

    if (hasTarget(h2El)) {
        tl.to(h2El as any, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.3");
    }

    if (hasTarget(pEl)) {
        tl.to(pEl as any, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.3");
    }

    if (hasTarget(btnEl)) {
        tl.to(btnEl as any, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
    }

    if (hasTarget(imgEl)) {
        tl.to(imgEl as any, { opacity: 1, x: "0%", duration: 0.7, ease: "power2.inOut" }, "-=0.2");
    }

    if (hasTarget(sliderEl)) {
        tl.to(sliderEl as any, { opacity: 1, x: "0%", duration: 0.6, ease: "power2.inOut" }, "-=0.2");
    }

    return tl;
};