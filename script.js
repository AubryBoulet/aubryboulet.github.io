//turn pages
const turnPageBtn = document.querySelectorAll('.nextprev-btn');
const pages = document.querySelectorAll('.book-page.page-right');
const contactBtn = document.querySelector('.btn.btn-contact');
const profilBtn = document.querySelector('.back-profile');
const totalPages = pages.length;
let pageNumber = 0;
const coverRight = document.querySelector('.cover.cover-right');
const profilPage = document.querySelector('.book-page.page-left');
let projectIndex = 0;
let projectTimeout = null;
const projects = [
    {
        img: "./ofourneau.png",
        tech: "React",
        description: "Ofourneau est un site de partage de recette permettant aux utilisateurs non connecter de parcourir et rechercher différentes recettes de cuisine, créer un compte et s'y connecter offre aux utilisateurs une gestion de favoris, la possibilitée de laisser des commentaires et de proposer leurs propres recettes. Il a été développé en 4 semaines comme projet de fin de formation.",
        url: 'http://www.ofourneau.fr'
    },
    {
        img: "./tetirs.png",
        tech: "Pure Basic",
        description: "Voici deux clones du célèbre jeu Tetris. Le premier à été fait avec pour challenge de n'importer aucun sprite, tout est donc \"déssinés\" en code. Le deuxième à été developpé dans le but de tester un moteur d'affichage 2D que j'ai également développé en Pure Basic.",
        url: 'https://drive.google.com/file/d/1g6SS-W3p1tW0u39iqg5ts91ecXPNvSl_/view?usp=sharing'
    },
    {
        img: "./pacman.png",
        tech: "JavaScript",
        description: "Après avoir été initié au JavaScript durant ma formation, j'ai souhaité en apprendre plus sur ce langage. Bien que Pacman soit un jeu simple à développer, l'IA des fantômes est assisté par un petit algorithme de path finding qui leurs permettent de tendre des embuscades efficaces et surprenantes.",
        url: 'https://mac-man.netlify.app/'
    },
    {
        img: "./synoptique.png",
        tech: "Pure Basic / React",
        description: "Synoptique Maker est un générateur de synoptique. Le front de l'application est développé en React et le back tourne sur un serveur web custom multi-thread que j'ai développé en Pure Basic, en respectant les standards sur code MIME et d'une API REST. Le serveur est architecturé autour du modèle MVC.",
        url: 'http://195.154.167.33:8081/'
    },
];

turnPageBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.dataset.page;
        const pageTurn = document.querySelector('#'+pageTurnId)
        if (pageTurn.classList.contains('turn')){
            pageTurn.classList.remove('turn')
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        }else{
            pageTurn.classList.add('turn')
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }
    }
})

contactBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
           page.classList.add('turn') 
           setTimeout(() => {
            page.style.zIndex = 20 + index;
           }, 500);
        },(index +1)*200 +100 );
    })
}

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0){
        pageNumber = totalPages - 1;
    }
}

profilBtn.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');
            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            },500);
        }, (index + 1)*200+100);
    })
}

setTimeout(() => {
   coverRight.classList.add('turn') 
    // coverRight.style.zIndex = -1
}, 2100);
setTimeout(() => {
    coverRight.style.zIndex = -1
}, 2800);
setTimeout(() => {
    profilPage.style.zIndex = 20
}, 3200);

pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove('turn');
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].style.zIndex = 10 + index;
        },500);
    }, (index + 1)*200+2100);
})

// Mailer


window.onload = function() {
    (function() {
        emailjs.init({
          publicKey: "RM7xQ-pihpCFBroS8",
        });
    })();
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('service_8et5r2e', 'template_93rqsyf', this)
            .then(() => {
                document.querySelector(".contact-message").classList.add("success");
                const message = document.querySelector(".contact-message.success");
                message.textContent = "Message envoyé avec succès";
                message.style.backgroundPosition = "0%";
                setTimeout(() => {
                    message.style.backgroundPosition = "100%";
                }, 5);
                setTimeout(() => {
                    message.classList.remove("success");
                    document.querySelector("#user_name").value = "";
                    document.querySelector("#user_email").value = "";
                    document.querySelector("#message").value = "";
                }, 2000)
            }, (error) => {
                document.querySelector(".contact-message").classList.add("fail");
                const message = document.querySelector(".contact-message.fail");
                message.textContent = "Une erreur est survenue";
                message.style.backgroundPosition = "0%"
                setTimeout(() => {
                    message.style.backgroundPosition = "100%";
                }, 5);
                setTimeout(() => {
                    message.classList.remove("fail")
                }, 2000)
            },
            );
    });
}

function handleClickNextProject() {
    projectIndex ++;
    if (projectIndex >= projects.length) projectIndex = 0;
    document.querySelector(".project-content").classList.add("fade");
    if (projectTimeout) clearTimeout(projectTimeout)
    const newImg = new Image();
    newImg.src = projects[projectIndex].img;
    const startTime = new Date();
    newImg.onload = () => {
        const loadTime = new Date();
        projectTimeout = setTimeout(() => {
            document.querySelector("#project-img").src = newImg.src
            document.querySelector("#project-desc").textContent = projects[projectIndex].description
            document.querySelector("#project-tech").textContent = projects[projectIndex].tech
            document.querySelector(".project-content").classList.remove("fade");
            projectTimeout = null;
        },500 - (loadTime - startTime))
    }
}

function handleClickConsultProject() {
    window.open(projects[projectIndex].url, "_blank");
}

function handleClickCV() {
    window.open('https://www.canva.com/design/DAF-MdlYraE/oAsBBPWRP7X2_TYXQvdTJA/view?utm_content=DAF-MdlYraE&utm_campaign=designshare&utm_medium=link&utm_source=editor','blank')
}

addEventListener("DOMContentLoaded", () => {
    document.querySelector("#project-consult").addEventListener("click", handleClickConsultProject);
    document.querySelector("#project-next").addEventListener("click", handleClickNextProject);
    document.querySelector(".btn-cv").addEventListener("click", handleClickCV);
})