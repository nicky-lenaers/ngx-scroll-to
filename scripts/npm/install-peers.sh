npm info . peerDependencies | sed -n 's/^{\{0,1\}[[:space:]]*'\''\{0,1\}\([^:'\'']*\)'\''\{0,1\}:[[:space:]]'\''\([^'\'']*\).*$/\1@\2/p' | xargs npm i
