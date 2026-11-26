# iDrugs Premium — projeto inicial

## Como abrir
1. Extraia o ZIP.
2. Abra a pasta `idrugs-premium` no Visual Studio Code.
3. Abra `index.html` no navegador (recomendado: extensão **Live Server**).
4. Para publicar, envie os arquivos mantendo a estrutura de pastas.

## Arquivos
- `index.html`: estrutura da página.
- `css/style.css`: identidade visual, layout e responsividade.
- `js/script.js`: catálogo, busca, filtros e carrinho demonstrativo.

## Importante sobre a loja publicada
Este pacote é uma **reformulação de frontend**. O catálogo e os preços foram transcritos da página pública consultada em 25/11/2026 e podem mudar. Confirme e atualize `products` em `js/script.js` antes de publicar.

O carrinho funciona localmente no navegador, mas o botão de checkout é apenas demonstrativo. Para receber pedidos reais, consultar estoque, autenticar usuários ou exibir pedidos anteriores, será necessário integrar o backend/API e o provedor de pagamento que sua loja utiliza. Não coloque chaves secretas ou credenciais no JavaScript do navegador.

As imagens originais dos produtos e o logo oficial não foram copiados; os cards usam arte gráfica CSS. Substitua os elementos visuais quando tiver os arquivos oficiais e autorização para utilizá-los.

As fontes Inter e Barlow Condensed são carregadas do Google Fonts; se quiser hospedá-las localmente, adicione os arquivos de fonte e ajuste o CSS.
