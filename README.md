<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:dc2626&height=200&section=header&text=LEGEND&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Performance%20Sem%20Limites&descAlignY=60&descSize=18" alt="header" />

"ESTE REPOSITORIO É APENAS PARA TESTES"

<br />

<a href="https://github.com/HenriqueCallegari/Legend/stargazers">
  <img src="https://custom-icon-badges.demolab.com/github/stars/HenriqueCallegari/Legend?style=for-the-badge&logo=star&color=f1c40f&logoColor=white&labelColor=2c2f33" alt="Stars" />
</a>
<a href="https://github.com/HenriqueCallegari/Legend/commits/main">
  <img src="https://custom-icon-badges.demolab.com/github/last-commit/HenriqueCallegari/Legend?style=for-the-badge&logo=history&color=ef4444&logoColor=white&labelColor=2c2f33" alt="Last commit" />
</a>

</div>

---

## Sobre o projeto

**LEGEND** é uma loja virtual de roupas e acessórios fitness — straps, coqueteleiras, camisetas, regatas. Tudo voltado pra quem treina pesado e quer equipamento que aguente o pique.

A loja é um **e-commerce estático**: páginas montadas com HTML, CSS e JavaScript puro, sem servidor por trás. Pense como uma vitrine completa que roda no próprio navegador — você vê os produtos, escolhe, coloca no carrinho e finaliza. O carrinho é guardado no próprio navegador do cliente (LocalStorage), então mesmo fechando a aba os itens continuam lá.

> Projeto criado pra estudo e portfólio — sem framework, sem dependência externa, só código limpo.

### O que o cliente faz

1. Abre a loja → vê a coleção em destaque
2. Clica num produto → vê detalhes, escolhe tamanho/cor
3. Adiciona ao carrinho → ícone do carrinho no topo mostra a quantidade
4. Finaliza no checkout → confere itens, valor total e dados de entrega

<br />

## Stack

<div align="center">

<a href="https://skillicons.dev">
  <img src="https://skillicons.dev/icons?i=html,css,js&theme=dark" alt="stack" />
</a>

</div>

| O que | Função |
|---|---|
| **HTML5** | Estrutura das páginas (menu, produtos, carrinho) |
| **CSS3** | Visual completo — cores, layout, responsividade pra celular/tablet/desktop |
| **JavaScript (ES Modules)** | Toda a lógica: adicionar ao carrinho, contar itens, calcular total |
| **LocalStorage** | Memória do navegador que guarda o carrinho mesmo depois de fechar a aba |

**Zero dependências externas.** Não usa React, Vue, jQuery nem CDN — funciona offline depois de carregado.

<br />

## Como rodar

Como é um site estático, basta abrir no navegador:

```bash
# 1. Baixa o projeto
git clone https://github.com/HenriqueCallegari/Legend.git
cd Legend

# 2. Abre o index.html direto no navegador
# (ou sobe um servidor local simples)
python -m http.server 8000
```

Acessa **http://localhost:8000** e pronto.

<br />

## Estrutura

```
Legend/
├── index.html          # Página inicial — hero, coleção em destaque
├── product.html        # Página de um produto individual
├── cart.html           # Carrinho de compras
├── checkout.html       # Finalização da compra
├── style.css           # Design system completo (cores, tipografia, layout)
└── script.js           # Lógica do carrinho, navegação, interações
```

<br />

## Funcionalidades

- **Carrinho persistente** — salva no navegador, não some quando fecha
- **Responsivo** — adapta de celular pequeno a tela 4K
- **Carregamento rápido** — sem framework pesado pra baixar
- **Visual de marca** — paleta escura com vermelho de destaque, fonte impactante
- **Cálculo automático** — subtotal, frete, total no checkout

<br />

## Autor

<div align="center">

**Henrique Callegari**

<a href="https://github.com/HenriqueCallegari">
  <img src="https://custom-icon-badges.demolab.com/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</a>
<a href="https://www.linkedin.com/in/henrique-callegari-/">
  <img src="https://custom-icon-badges.demolab.com/badge/-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>

</div>

<br />

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:dc2626,100:0f172a&height=100&section=footer" alt="footer" />

</div>
