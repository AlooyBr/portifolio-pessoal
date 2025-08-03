// JavaScript para funcionalidades interativas do site

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicialização das funcionalidades
    initMobileMenu();
    initPortfolioFilters();
    initContactForm();
    initSmoothScrolling();
    initAnimations();
    
});

// Funcionalidade do menu mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Filtros do portfólio
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove classe active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona classe active ao botão clicado
                this.classList.add('active');
                
                // Filtra os itens do portfólio
                portfolioItems.forEach(item => {
                    const categories = item.getAttribute('data-category');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Funcionalidade do formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula o envio do formulário
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const buttonText = submitButton.querySelector('.btn-text');
            const buttonLoading = submitButton.querySelector('.btn-loading');
            
            // Mostra estado de carregamento
            buttonText.style.display = 'none';
            buttonLoading.style.display = 'inline';
            submitButton.disabled = true;
            
            // Simula delay de envio
            setTimeout(() => {
                // Restaura o botão
                buttonText.style.display = 'inline';
                buttonLoading.style.display = 'none';
                submitButton.disabled = false;
                
                // Mostra mensagem de sucesso
                showFormMessage('Mensagem enviada com sucesso! Retornarei o contato em breve.', 'success');
                
                // Limpa o formulário
                contactForm.reset();
                
            }, 2000);
        });
        
        // Validação em tempo real
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

// Função para mostrar mensagens do formulário
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Validação de campos
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove classes de erro anteriores
    field.classList.remove('error');
    
    // Validação de campo obrigatório
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Validação de email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Adiciona classe de erro se inválido
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#ef4444';
    } else {
        field.style.borderColor = '#10b981';
    }
    
    return isValid;
}

// Rolagem suave para âncoras
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animações ao rolar a página
function initAnimations() {
    // Observador de interseção para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Anima barras de progresso
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);
                }
                
                // Anima barras de idiomas
                if (entry.target.classList.contains('progress')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    document.querySelectorAll('.highlight-card, .course-card, .portfolio-item, .skill-progress, .progress').forEach(el => {
        observer.observe(el);
    });
}

// Função para destacar link ativo na navegação
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Atualiza link ativo ao carregar a página
updateActiveNavLink();

// Função para copiar texto para área de transferência
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showFormMessage('Texto copiado para a área de transferência!', 'success');
    }).catch(function(err) {
        console.error('Erro ao copiar texto: ', err);
    });
}

// Adiciona funcionalidade de cópia para informações de contato
document.querySelectorAll('.contact-details p').forEach(element => {
    element.addEventListener('click', function() {
        const text = this.textContent.trim();
        if (text.includes('@') || text.includes('(')) {
            copyToClipboard(text);
        }
    });
});

// Função para lazy loading de imagens (se houver)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para modo escuro (opcional)
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // Verifica preferência salva
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
}

// Função para mostrar/ocultar botão "voltar ao topo"
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Função para preloader (se houver)
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        });
    }
}

// Função para analytics (Google Analytics, etc.)
function initAnalytics() {
    // Aqui você pode adicionar código para Google Analytics
    // ou outras ferramentas de análise
    console.log('Site carregado - Analytics inicializado');
}

// Função para tratamento de erros
window.addEventListener('error', function(e) {
    console.error('Erro no site:', e.error);
    // Aqui você pode enviar erros para um serviço de monitoramento
});

// Função para otimização de performance
function initPerformanceOptimizations() {
    // Preload de recursos críticos
    const criticalResources = [
        'estilo.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Inicializa otimizações de performance
initPerformanceOptimizations();

// Adiciona classe para indicar que JavaScript está ativo
document.documentElement.classList.add('js-enabled');

// Log de inicialização
console.log('Site do portfólio carregado com sucesso!');
console.log('Desenvolvido por João Silva - 2024');

