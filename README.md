# Tibia Scout 🛡️

O **Tibia Scout** é um dashboard de alta performance desenvolvido para a comunidade tibiana. O projeto oferece consulta de personagens em tempo real, monitoramento de leilões do Bazaar, rastreamento do NPC Rashid, fases da lua (Grimvale) e calendário de eventos oficiais.

---

## 🚀 Status do Projeto e Deploy

A interface (Frontend) está em produção e pode ser acessada via Vercel:
🔗 **[https://tibia-scout.vercel.app](https://tibia-scout-luizgustavolabs-projects.vercel.app)**

> **⚠️ Notas Importantes de Infraestrutura:**
> - **Supabase:** No plano gratuito, o projeto é pausado após **7 dias** de inatividade. Caso o banco pare de responder, acesse o Dashboard do Supabase e clique em **"Restore Project"**.
> - **Vercel:** Projetos inativos entram em modo de espera. O primeiro acesso após longo período pode apresentar um leve atraso (cold start).
> - **Bazaar-API (Backend):** A funcionalidade de **Leilão/Bazaar** depende do deploy e execução do repositório `bazaar-api`. Sem este backend ativo, as consultas ao mercado não retornarão dados, pois o frontend não realiza o scraping pesado de leilões diretamente. 
🔗 **Configuração Railway [https://github.com/luizgustavolab/bazaar-api](https://github.com/luizgustavolab/bazaar-api)** 
🔗 **Configuração DOCKER + Render [https://github.com/luizgustavolab/bazaar-api-docker](https://github.com/luizgustavolab/bazaar-api-docker)**
---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React + Vite (SPA de alta performance).
- **Estilização:** Tailwind CSS com design Glassmorphism.
- **Banco de Dados & Auth:** Supabase.
- **Integração de Dados:** Axios + ScraperAPI (para busca de personagens).
- **Processamento de Leilões:** Bazaar-API (Backend assíncrono via Node.js/Prisma).

---

## 🚀 Como Começar (Guia do Programador)

Siga estas instruções para configurar o ambiente de desenvolvimento local.

### 📋 Pré-requisitos

- **Node.js:** Versão 18.0 ou superior.
- **Git:** Instalado e configurado.
- **Bazaar-API:** Deve estar rodando para que as funcionalidades de mercado funcionem.

### 🔧 Instalação Passo a Passo

1. **Clone o repositório:**
   git clone [https://github.com/luizgustavolab/tibia-scout.git](https://github.com/luizgustavolab/tibia-scout.git)
   cd tibia-scout

2. **Instale as dependências:**
    npm install

3. **Configuração das Variáveis de Ambiente:**
    Crie um arquivo .env na raiz do projeto (copie do modelo abaixo). `Nunca commite o arquivo .env.`

    VITE_SUPABASE_URL = URL do projeto no Supabase. 
    VITE_SUPABASE_ANON_KEY = Chave anônima do Supabase. 
    VITE_API_URL = URL da **Bazaar-API** no Render (ex: https://bazaar-api-docker.onrender.com) (ou RAILWAY, por exemplo).

4. **Inicie o servidor de desenvolvimento:**
    npm run dev


## 🌐 Configuração de Deploy (Vercel)

Como o arquivo `.env` não é enviado para o repositório por questões de segurança, você deve configurar manualmente as variáveis de ambiente no `painel da Vercel` para que a aplicação funcione em produção.

### Passo a Passo:
1. Vá em **Project Settings** > **Environment Variables**.
2. Adicione as seguintes chaves e valores:

    VITE_SUPABASE_URL = URL do projeto no Supabase. 
    VITE_SUPABASE_ANON_KEY = Chave anônima do Supabase. 
    VITE_API_URL = URL da **Bazaar-API** no Render (ex: https://bazaar-api-docker.onrender.com) (ou RAILWAY, por exemplo)

> **⚠️ Importante:** Após adicionar ou alterar qualquer variável na Vercel, é necessário realizar um **Redeploy** para que o Vite compile o código com os novos valores.

---

## 🏗️ Arquitetura e Decisões Técnicas
- Foco em UX: A migração de Next.js para Vite foi estratégica para garantir uma Single Page Application veloz e responsiva.
- Descentralização: A lógica de eventos (Lua e Rashid) é calculada localmente (UTC-6), reduzindo o custo operacional e a latência.
- Segurança: O uso de ScraperAPI protege o IP do servidor/cliente contra bloqueios da CipSoft, enquanto o Supabase centraliza a persistência de históricos e favoritos de forma segura.

## 🔄 Padrão de Commits
- Utilizamos o padrão profissional para manter a governança do repositório:
    feat: Nova funcionalidade.
    fix: Correção de bug.
    docs: Mudanças na documentação.
    style: Ajustes visuais (CSS/Tailwind).
    refactor: Refatoração de código sem mudar função.
    chore: Atualização de dependências ou build.

## 🛡️ Licença e Autoria
- Projeto idealizado e desenvolvido por Luiz Gustavo 🔗 **[https://github.com/luizgustavolab](https://github.com/luizgustavolab)** .
    Este é um projeto de código aberto. Sinta-se à vontade para contribuir respeitando os padrões estabelecidos e garantindo a integração correta com os serviços de backend.