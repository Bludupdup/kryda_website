"use strict";


document.addEventListener(
    "DOMContentLoaded",
    () => {


/* =========================================================
   REFERENCES
========================================================= */

const hamburger =
    document.getElementById(
        "hamburger"
    );

const navMenu =
    document.getElementById(
        "navMenu"
    );

const searchToggle =
    document.getElementById(
        "searchToggle"
    );

const searchPanel =
    document.getElementById(
        "searchPanel"
    );

const closeSearch =
    document.getElementById(
        "closeSearch"
    );

const activitySearch =
    document.getElementById(
        "activitySearch"
    );

const filterButtons =
    [
        ...document.querySelectorAll(
            ".filter-chip"
        )
    ];

const activityCards =
    [
        ...document.querySelectorAll(
            ".activity-card"
        )
    ];

const emptyState =
    document.getElementById(
        "emptyState"
    );

const activityModal =
    document.getElementById(
        "activityModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalArt =
    document.getElementById(
        "modalArt"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalPlay =
    document.getElementById(
        "modalPlay"
    );

const loadingMessage =
    document.getElementById(
        "loadingMessage"
    );

const backTop =
    document.getElementById(
        "backTop"
    );

const heroVideo =
    document.getElementById(
        "heroVideo"
    );


let activeFilter =
    "all";

let searchValue =
    "";


/* =========================================================
   HERO VIDEO
   PLAY ONCE AND HOLD LAST FRAME
========================================================= */

if (heroVideo) {

    heroVideo.loop =
        false;


    heroVideo.addEventListener(
        "ended",
        () => {

            heroVideo.pause();


            if (
                Number.isFinite(
                    heroVideo.duration
                ) &&
                heroVideo.duration > 0.1
            ) {

                heroVideo.currentTime =
                    Math.max(
                        0,
                        heroVideo.duration - 0.04
                    );

            }

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

if (
    hamburger &&
    navMenu
) {

    hamburger.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();


            const open =
                navMenu.classList.toggle(
                    "open"
                );


            hamburger.classList.toggle(
                "open",
                open
            );


            hamburger.setAttribute(
                "aria-expanded",
                String(open)
            );

        }
    );


    document
        .querySelectorAll(
            ".nav-link"
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navMenu.classList.remove(
                            "open"
                        );


                        hamburger.classList.remove(
                            "open"
                        );


                        hamburger.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );


    document.addEventListener(
        "click",
        (event) => {

            const clickedMenu =
                navMenu.contains(
                    event.target
                );


            const clickedHamburger =
                hamburger.contains(
                    event.target
                );


            if (
                navMenu.classList.contains(
                    "open"
                ) &&
                !clickedMenu &&
                !clickedHamburger
            ) {

                navMenu.classList.remove(
                    "open"
                );


                hamburger.classList.remove(
                    "open"
                );


                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* =========================================================
   SEARCH PANEL
========================================================= */

if (
    searchToggle &&
    searchPanel
) {

    searchToggle.addEventListener(
        "click",
        () => {

            searchPanel.classList.toggle(
                "open"
            );


            if (
                searchPanel.classList.contains(
                    "open"
                )
            ) {

                setTimeout(
                    () => {

                        activitySearch?.focus();

                    },
                    150
                );

            }

        }
    );

}


closeSearch?.addEventListener(
    "click",
    () => {

        searchPanel?.classList.remove(
            "open"
        );

    }
);


/* =========================================================
   ACTIVITY FILTERING
========================================================= */

function filterActivities() {

    let visibleCount =
        0;


    activityCards.forEach(
        (card) => {

            const title =
                (
                    card.dataset.title ||
                    ""
                ).toLowerCase();


            const category =
                (
                    card.dataset.category ||
                    ""
                ).toLowerCase();


            const description =
                (
                    card.dataset.description ||
                    ""
                ).toLowerCase();


            const searchMatches =
                searchValue === "" ||

                title.includes(
                    searchValue
                ) ||

                category.includes(
                    searchValue
                ) ||

                description.includes(
                    searchValue
                );


            const categoryMatches =
                activeFilter ===
                    "all" ||

                category ===
                    activeFilter;


            const visible =
                searchMatches &&
                categoryMatches;


            card.classList.toggle(
                "hidden",
                !visible
            );


            if (visible) {

                visibleCount++;

            }

        }
    );


    emptyState?.classList.toggle(
        "show",
        visibleCount === 0
    );

}


/* =========================================================
   SEARCH INPUT
========================================================= */

activitySearch?.addEventListener(
    "input",
    (event) => {

        searchValue =
            event.target.value
                .trim()
                .toLowerCase();


        filterActivities();

    }
);


/* =========================================================
   FILTER BUTTONS
========================================================= */

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                activeFilter =
                    (
                        button.dataset.filter ||
                        "all"
                    ).toLowerCase();


                filterActivities();

            }
        );

    }
);


/* =========================================================
   ACTIVITY MODAL
========================================================= */

function openActivity(
    card
) {

    if (!activityModal) {

        return;

    }


    if (modalArt) {

        modalArt.textContent =
            card.dataset.icon ||
            "🎮";

    }


    if (modalCategory) {

        const category =
            card.dataset.category ||
            "activity";


        modalCategory.textContent =
            category
                .charAt(0)
                .toUpperCase() +

            category.slice(1);

    }


    if (modalTitle) {

        modalTitle.textContent =
            card.dataset.title ||
            "Kryda Activity";

    }


    if (modalDescription) {

        modalDescription.textContent =
            card.dataset.description ||
            "A fun Kryda activity.";

    }


    if (loadingMessage) {

        loadingMessage.classList.remove(
            "show"
        );


        loadingMessage.textContent =
            "Preparing your activity...";

    }


    if (modalPlay) {

        modalPlay.textContent =
            "▶ Start Activity";

    }


    activityModal.classList.add(
        "open"
    );


    activityModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    if (!activityModal) {

        return;

    }


    activityModal.classList.remove(
        "open"
    );


    activityModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   ACTIVITY CARDS
========================================================= */

activityCards.forEach(
    (card) => {

        card.addEventListener(
            "click",
            () => {

                openActivity(
                    card
                );

            }
        );

    }
);


/* =========================================================
   MODAL CLOSE
========================================================= */

modalClose?.addEventListener(
    "click",
    closeModal
);


activityModal?.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            activityModal
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "Escape"
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   START ACTIVITY
========================================================= */

modalPlay?.addEventListener(
    "click",
    () => {

        modalPlay.textContent =
            "Loading...";


        if (loadingMessage) {

            loadingMessage.classList.add(
                "show"
            );


            loadingMessage.textContent =
                "Preparing your activity...";

        }


        setTimeout(
            () => {

                if (
                    loadingMessage
                ) {

                    loadingMessage.textContent =
                        "✨ Activity prototype coming soon!";

                }


                modalPlay.textContent =
                    "▶ Start Activity";

            },
            700
        );

    }
);


/* =========================================================
   SMOOTH SCROLL BUTTONS
========================================================= */

document
    .querySelectorAll(
        "[data-scroll]"
    )
    .forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const selector =
                        button.dataset.scroll;


                    if (!selector) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            selector
                        );


                    target?.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }
            );

        }
    );


/* =========================================================
   BACK TO TOP
========================================================= */

backTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior:
                "smooth"

        });

    }
);


/* =========================================================
   SIDE REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal-left, .reveal-right"
    );


if (
    "IntersectionObserver" in
    window
) {

    const revealObserver =
        new IntersectionObserver(
            (
                entries,
                observer
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold:
                    0.14,

                rootMargin:
                    "0px 0px -45px 0px"
            }
        );


    revealElements.forEach(
        (
            element,
            index
        ) => {

            element.style.transitionDelay =
                `${Math.min(
                    (index % 4) * 70,
                    210
                )}ms`;


            revealObserver.observe(
                element
            );

        }
    );

}

else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

filterActivities();


});