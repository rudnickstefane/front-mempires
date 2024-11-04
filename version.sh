#!/bin/bash

# E-mail do usuário responsável pelo deploy
user=$(git config user.name)
email=$(git config user.email)

# Verifica se há uma tag associada ao commit atual; caso contrário, interrompe a execução
revision=$(git describe --tags 2>/dev/null)
if [[ -z "$revision" ]]; then
  echo "[ERRO]: Nenhuma tag encontrada no repositório. Certifique-se de que há uma tag associada ao commit atual."
  exit 1
fi

# Nome do arquivo onde as informações da versão serão salvas
version_file="versionInfo.inf"

# Limpar o arquivo anterior (se existir) ou cria o arquivo
> "$version_file"

# Iniciando processo de Registro de Publicação
echo "==============================================="
echo "            REGISTRANDO PUBLICAÇÃO             "
echo "==============================================="
echo
echo "----------------- RESPONSÁVEL -----------------"
printf "Usuário: %s\n" "$user"
printf "E-mail: %s\n" "$email"
echo "-----------------------------------------------"
echo

# Solicita ao usuário o Tipo de Publicação ou uma Descrição
echo "Insira o Tipo de Publicação ou Descrição (Exemplos):"
echo "- Emergencial"
echo "- Normal"
echo "- Correção do problema XYZ"
read -p "Tipo de Publicação: " description

# Verifica se a descrição não está vazia
if [[ -z "$description" ]]; then
  echo "[ERRO]: A descrição da publicação não pode estar vazia."
  exit 1
fi

# Exibir tipos de commit
echo
echo "Insira o número correspondente ao tipo de commit (Exemplos):"
echo "1. Build: Alterações que afetam o sistema de construção ou dependências externas;"
echo "2. Ci: Alterações nos arquivos de configuração e scripts de CI;"
echo "3. Docs: Alterações somente em arquivos de documentação;"
echo "4. Feat: Adições de novas funcionalidades;"
echo "5. Fix: Correções de bugs;"
echo "6. Perf: Melhoria de desempenho;"
echo "7. Refactor: Mudanças no código que não alteram a funcionalidade;"
echo "8. Style: Alterações de formatação que não afetam o significado;"
echo "9. Test: Adições ou correções de testes automatizados;"
echo "10. Chore: Atualizações de tarefas sem alteração no código de produção;"
echo "11. Env: Modificações em arquivos de configuração de CI."
read -p "Número do Tipo de Commit: " commit_type

# Mapear número do commit type para incrementos de versão
case "$commit_type" in
  1|2|3|10|11) increment="0.0.0" ;; # Nao altera a versão principal
  4) increment="0.1.0" ;;            # Feat
  5) increment="0.0.1" ;;            # Fix
  6) increment="0.0.1" ;;            # Perf
  7) increment="0.0.0" ;;            # Refactor
  8) increment="0.0.0" ;;            # Style
  9) increment="0.0.1" ;;            # Test
  *) echo "[ERRO]: Tipo de commit inválido." ; exit 1 ;;
esac

# Se o revision não tem um formato de versão válido, iniciar em 0.0.0
if [[ ! "$revision" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    revision="v0.0.0"
fi

# Incrementa a versão
IFS='.' read -r major minor patch <<< "$revision"
IFS='.' read -r inc_major inc_minor inc_patch <<< "$increment"

new_major=$((major + inc_major))
new_minor=$((minor + inc_minor))
new_patch=$((patch + inc_patch))

new_revision="v${new_major}.${new_minor}.${new_patch}"

# Captura o changelog e adiciona o prefixo [TICKET]: em cada linha
changelog=$(git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%h - %s" | awk '{printf "[TICKET]: %s\n", $0}')

# Atualizar CHANGELOG.md
changelog_file="CHANGELOG.md"
{
  echo "## [v${new_revision}] - $(date +'%Y-%m-%d')"
  echo "- $description"
  echo "$changelog"
  echo ""
} >> "$changelog_file"

# Formata as variáveis
revision=$(echo "$revision" | tr '\n' '')
description=$(echo "$description" | tr '\n' ' ')

# Preencher o arquivo com as informações
{
    echo "[INFO]: Versão $new_revision criada em produção por $user ($email)"
    echo "[INFO]: Descrição da publicação: $description"
    echo "[INFO]: Esta versão contém o(s) ticket(s)"
    echo "$changelog"
    echo "[INFO]: Foram aplicado(s) $(echo "$changelog" | wc -l) ticket(s) a esta Versão"
} >> "$version_file"

# Criar a tag no Git
git tag "v$new_revision" || { echo "[ERRO]: Falha ao criar a tag no Git."; exit 1; }
git push origin "v$new_revision" || { echo "[ERRO]: Falha ao fazer push da tag para o repositório."; exit 1; }

echo
echo "---------------- TAG DE VERSÃO ----------------"
printf "Versão Atual: %s\n" "v$revision"
printf "Nova Versão: %s\n" "v$new_revision"
echo "-----------------------------------------------"
echo
echo "==============================================="
echo "       FIM DE REGISTRO PARA PUBLICAÇÃO         "
echo "==============================================="
echo

echo "Arquivo versionInfo.inf atualizado com sucesso!"
echo "CHANGELOG.md atualizado com a nova versão!"
echo "Versão registrada com sucesso: $new_revision!"