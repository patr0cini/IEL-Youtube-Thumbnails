# /series

Fundos fixos por **série de mensagens**. Cada série tem a sua pasta própria e o
fundo é **sempre o mesmo** para todas as mensagens dessa série — garantindo
consistência visual ao longo da série.

## Estrutura

```
series/
  Romanos/
    background.png
  Êxodo/
    background.png
  Família/
    background.png
```

- O nome da pasta tem de coincidir (sem distinção de maiúsculas/acentos) com o
  **Nome da série** escrito no formulário.
- Cada pasta deve conter um ficheiro `background.png` (ou `.jpg` / `.webp`).
- Resolução recomendada: **1280×720** (rácio 16:9).

> Se não existir pasta para a série escrita, a aplicação gera um fundo
> cinematográfico **determinístico** a partir do nome da série: a mesma série
> produz sempre exatamente o mesmo fundo, mesmo sem ficheiro.
