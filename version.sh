#!/bin/bash

# E-mail do usuário responsável pelo deploy
user=$(git config user.name)
email=$(git config user.email)

# Verifica se há tags no repositório
tags=$(git tag)
if [[ -z "$tags" ]]; then
  echo "[INFO]: Nenhuma tag encontrada no repositório. Criando a tag v1.0.0."
  git tag "v1.0.0" || { echo "[ERRO]: Falha ao criar a tag v1.0.0."; exit 1; }
  git push origin "v1.0.0" || { echo "[ERRO]: Falha ao fazer push da tag v1.0.0 para o repositório."; exit 1; }
  revision="v1.0.0"
else
  # Obtém a última versão
  revision=$(git describe --tags --abbrev=0 2>/dev/null)
  if [[ -z "$revision" ]]; then
    echo "[ERRO]: Não foi possível obter a versão atual."
    exit 1
  fi
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

# Solicita ao usuário a Situação para essa Publicação
echo "Insira a situação para essa publicação (Exemplos):"
echo "- Emergencial"
echo "- Normal"
echo "- Correção do problema XYZ"
read -p "Situação: " description

# Verifica se a descrição não está vazia
if [[ -z "$description" ]]; then
  echo "[ERRO]: A situação da publicação não pode estar vazia."
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

# Mapeamento dos tipos de commit para o incremento
case "$commit_type" in
  1|2|3|10|11) increment="0.0.0" ;; # Não altera a versão principal
  4) increment="0.1.0" ;;            # Feat
  5|6|9) increment="0.0.1" ;;        # Fix, Perf, Test
  7|8) increment="0.0.0" ;;          # Refactor, Style
  *) echo "[ERRO]: Tipo de commit inválido." ; exit 1 ;;
esac

# Se o revision não tem um formato de versão válido, iniciar em v0.0.0
if [[ ! "$revision" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    revision="v0.0.0"
fi

# Incrementa a versão
IFS='.' read -r major minor patch <<< "${revision:1}" # Remove 'v' para processar
IFS='.' read -r inc_major inc_minor inc_patch <<< "$increment"

# Garante que a nova versão é válida
new_major=$((major + inc_major))
new_minor=$((minor + inc_minor))
new_patch=$((patch + inc_patch))

# Inicia nova versão com os valores calculados
new_revision="v${new_major}.${new_minor}.${new_patch}"

# Verifica se a nova tag já existe
while git rev-parse "$new_revision" >/dev/null 2>&1; do
  # Se a tag já existe, incrementa na parte correspondente
  case "$increment" in
    0.1.0) 
      new_minor=$((new_minor + 1)) 
      new_patch=0
      ;;
    0.0.1)
      new_patch=$((new_patch + 1))
      ;;
    0.0.0)
      echo "[AVISO]: Tag $new_revision já existe, mas não houve alteração em versões principais ou menores."
      exit 1 # Não faz nada se não houver mudança na versão
      ;;
  esac
  new_revision="v${new_major}.${new_minor}.${new_patch}"
done

# Captura o changelog e adiciona o prefixo [TICKET]: em cada linha
changelog=$(git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%h %s" | awk '{printf "[%s][TICKET]%s\n", $1, substr($0, index($0,$2))}')

description=$(echo "$description" | tr -d '\n')

# Atualizar CHANGELOG.md
changelog_file="CHANGELOG.md"
{
  echo "## [${new_revision}] - $(date +'%Y-%m-%d às %H:%M:%S')"
  echo "- Situação: $description"
  echo "- $changelog"
  echo ""
} >> "$changelog_file"

# Preencher o arquivo com as informações
{
    echo "[INFO]: Versão $new_revision criada em produção por $user ($email)"
    echo "[INFO]: Descrição da publicação: $description"
    echo "[INFO]: Esta versão contém o(s) ticket(s)"
    echo "$changelog"
    echo "[INFO]: Foram aplicado(s) $(echo "$changelog" | wc -l) ticket(s) a esta Versão"
} >> "$version_file"

# Criar a tag no Git
git tag "$new_revision" || { echo "[ERRO]: Falha ao criar a tag no Git."; exit 1; }
git push origin "$new_revision" || { echo "[ERRO]: Falha ao fazer push da tag para o repositório."; exit 1; }

# Aqui estamos capturando a versão anterior corretamente
previous_revision=$(git tag | grep -v "$new_revision" | sort -V | tail -n 1)

# Atualiza a Master com as alterações realizadas.
git add .
git commit -m "Master atualizada com a versão $new_revision"
git push origin master

echo
echo "---------------- TAG DE VERSÃO ----------------"
printf "Versão Anterior: %s\n" "$previous_revision"
printf "Versão Atual: %s\n" "$new_revision"
echo "-----------------------------------------------"
echo
echo "==============================================="
echo "       FIM DE REGISTRO PARA PUBLICAÇÃO         "
echo "==============================================="
echo

echo "Arquivo versionInfo.inf atualizado com sucesso!"
echo "CHANGELOG.md atualizado com a nova versão!"
echo "Versão registrada com sucesso: $new_revision!"
