# Berserk Fitness — E-commerce Estático

E-commerce fitness moderno, responsivo e funcional desenvolvido com HTML, CSS e JavaScript puro (ES Modules). Sem frameworks, sem dependências externas.

---

## 📁 Estrutura de Pastas

```
/projeto
│
├── index.html          ← Página inicial
├── cart.html           ← Carrinho de compras
├── product.html        ← Página de produto individual
├── checkout.html       ← Finalização de compra
├── style.css           ← Design system completo
├── script.js           ← Entry point principal
│
├── js/
│   ├── cart.js         ← Módulo de carrinho (localStorage)
│   ├── products.js     ← Catálogo de produtos e helpers
│   └── utils.js        ← Utilitários (toast, scroll, etc.)
│
├── pages/
│   ├── about.html      ← Sobre a marca
│   └── contact.html    ← Formulário de contato
│
└── assets/
    ├── imagens/        ← Imagens dos produtos (adicionar aqui)
    ├── icons/          ← Ícones customizados
    └── fonts/          ← Fontes locais (opcional)
```

---

## 🚀 Como Rodar

### Opção 1 — Live Server (recomendado)
1. Abra o projeto no VS Code
2. Instale a extensão **Live Server**
3. Clique com botão direito em `index.html` → **Open with Live Server**

### Opção 2 — Python HTTP Server
```bash
# Python 3
python -m http.server 8080

# Acesse: http://localhost:8080
```

### Opção 3 — Node.js
```bash
npx serve .
```

> ⚠️ **Importante:** O projeto usa ES Modules (`type="module"`). É necessário servir via HTTP — não funciona abrindo o `index.html` diretamente como arquivo local (`file://`).

---

## ✅ Funcionalidades

### Carrinho
- Adicionar/remover produtos
- Aumentar/diminuir quantidade
- Subtotal e total automáticos
- Frete grátis acima de R$ 299
- **Cupons de desconto:**
  - `BERSERK10` — 10% OFF
  - `PRIMEIRACOMPRA` — 15% OFF
  - `FITNESS20` — 20% OFF
- Persistência via **localStorage**

### Produto
- Seleção de tamanho e cor
- Seleção de quantidade
- Produtos relacionados
- Avaliações e rating

### Checkout
- Formulário de dados pessoais e endereço
- 3 formas de pagamento (cartão, PIX, boleto)
- Confirmação de pedido com limpeza de carrinho

### Design
- Dark mode completo
- Responsivo: mobile, tablet, desktop
- Animações e transições suaves
- Toasts de feedback
- Scroll reveal

---

## 🎨 Design System

### Cores principais
| Token | Valor | Uso |
|-------|-------|-----|
| `--black` | `#0a0a0a` | Background principal |
| `--dark` | `#111111` | Seções |
| `--accent` | `#e8194b` | Destaque / CTA |
| `--white` | `#ffffff` | Texto |
| `--gray` | `#888888` | Texto secundário |

### Tipografia
- **Display:** Bebas Neue (títulos grandes)
- **Heading:** Barlow Condensed (subtítulos, labels)
- **Body:** Barlow (textos, descrições)

---

## 📦 Adicionando Produtos

Edite o arquivo `js/products.js` e adicione um novo objeto ao array `PRODUCTS`:

```js
{
  id: 9,                          // ID único
  name: 'Meu Novo Produto',
  category: 'camisetas',          // categoria (slug)
  categoryLabel: 'Camisetas',     // label exibido
  price: 149.90,
  oldPrice: 199.90,               // null se não tiver desconto
  badge: 'Novo',                  // null para sem badge
  description: 'Descrição...',
  colors: ['#0a0a0a'],
  sizes: ['P', 'M', 'G', 'GG'],
  inStock: true,
  featured: false,
  rating: 4.5,
  reviews: 20,
  emoji: '👕',                    // emoji exibido no card
  tags: ['tag1', 'tag2'],
}
```

---

## 🖼️ Adicionando Imagens

1. Coloque as imagens em `assets/imagens/`
2. No `js/products.js`, adicione o campo `image: './assets/imagens/produto.jpg'` no produto
3. Nos templates HTML dos cards, substitua `product-card__img-placeholder` por uma tag `<img>`

---

## 📱 Breakpoints

| Breakpoint | Largura |
|------------|---------|
| Mobile | `≤ 480px` |
| Tablet | `≤ 768px` |
| Laptop | `≤ 1024px` |
| Desktop | `≤ 1200px` |

---

## 🔮 Expansão Futura

- [ ] Integração com API de pagamento (Stripe / Mercado Pago)
- [ ] Sistema de login / conta do cliente
- [ ] Página de rastreio de pedido
- [ ] Busca e filtros avançados
- [ ] Sistema de avaliações
- [ ] Página de blog / conteúdo
- [ ] Integração com ERP / estoque

---

## 🛠️ Tecnologias

- HTML5 Semântico
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- JavaScript ES2022 (Modules, Optional Chaining, Intl API)
- Web Storage API (localStorage)
- Intersection Observer API (scroll reveal)
- Google Fonts (Bebas Neue, Barlow Condensed, Barlow)

---

© 2025 Berserk Fitness. Projeto desenvolvido como template de e-commerce estático.
