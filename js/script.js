const form = document.querySelector("form");
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const campoRepositorio = document.querySelector("#repositorio").value;
            const dataInicial = document.querySelector("#dataInicial").value;
            const dataFinal = document.querySelector("#dataFinal").value;
            const usuario = obterNomeUsuario(campoRepositorio);
            const nomeRepositorio = obterNomeRepositorio(campoRepositorio);
            console.log(usuario);
            console.log(nomeRepositorio);

            buscarCommits(usuario, nomeRepositorio, dataInicial, dataFinal);
            
        });

        function buscarCommits(usuario, nomeRepositorio, dataInicial, dataFinal) {
            const url = `https://api.github.com/repos/${usuario}/${nomeRepositorio}/commits?since=${dataInicial}&until=${dataFinal}`;
            fetch(url).
                then(response => response.json()).
                then(commits => {
                    console.log(commits); 
                    contarCommits(commits);
                }).catch(error=>{
                    console.log(error);
                });
        }

        function contarCommits(commits) {
            const commitsPorDia = {};
            console.log("commitsPorDia: ", commitsPorDia)
            commits.forEach(element => {
                const dataCommit = element.commit.author.date.substr(0, 10);
                let mensagemCommit = element.commit.message + dataCommit;
                console.log(mensagemCommit)
                if (commitsPorDia[dataCommit]) {
                    commitsPorDia[dataCommit].quantidade++;
                } else {
                    commitsPorDia[dataCommit] = { quantidade: 1, data: dataCommit, mensagem: mensagemCommit };
                }
            });
            const commitsPorDiaArray = Object.keys(commitsPorDia).map(dataCommit => {
                return { data: dataCommit, quantidade: commitsPorDia[dataCommit].quantidade, mensagem: mensagemCommit }; // retorna um objeto com todas as informações
            });
            console.log("commitsPorDiaArray: ", commitsPorDiaArray)
            mostrarTela(commitsPorDiaArray);
        }

        function mostrarTela(commits) {
            const dados = document.querySelector("#dados");
            commits.forEach(element => {
                const h1 = document.createElement("h1");
                h1.innerHTML = element.data + " - " + element.quantidade + " - " + element.mensagem;
                dados.appendChild(h1);
            });
        }

        function obterNomeUsuario(campoRepositorio){
            let url = campoRepositorio.split('/'); //  ['https:', '', 'github.com', 'frankwco', 'loja']
            let usuario = url[3];
            return usuario;
        }

        function obterNomeRepositorio(campoRepositorio){
            let url = campoRepositorio.split('/'); //  ['https:', '', 'github.com', 'frankwco', 'loja']
            let nomeRepositorio = url[4];
            return nomeRepositorio;
        }


        function calcularQuantidadeDias(dataInicial, dataFinal){
            const subtracaoDatas   = new Date(dataFinal) - new Date(dataInicial)
            const quantidadeDias = subtracaoDatas / (1000 * 60 * 60 * 24);
            console.log(quantidadeDias) 
            return quantidadeDias;
        }


        function quantidadeEstrelas(campoRepositorio){
            // https://api.github.com/repos/santosraquel/atividadeRecibo/stargazers
        }

        function quantidadeForks(){
            // https://api.github.com/repos/OWNER/REPO/forks
        }

        function listaTabela(){
            let tbody = document.getElementById("tbody");
            let tr = tbody.insertRow();
        }

        function validateField(){
           toggleRepositoryError();
           toggleDateStartError();
           toggleDateEndError();
        }

        function toggleRepositoryError(){
             // obter valor do campo
             const campoRepositorio = document.getElementById("repositorio").value;
             // se o campo respositorio for vazio
             if(!campoRepositorio){
                // mostra a mensagem
                document.getElementById('messageRepositoryError').style.display = 'block';
             }else if(campoRepositorio){
                // esconde a mensagem
                document.getElementById('messageRepositoryError').style.display = 'none';
             }
        }

        function toggleDateStartError(){
            const dataInicial = document.getElementById('dataInicial').value;

            if(!dataInicial){
                document.getElementById('messageDateStartError').style.display = 'block';
            }else if(dataInicial){
                document.getElementById('messageDateStartError').style.display = 'none';
            }
        }

        function toggleDateEndError(){
            const dataFinal = document.getElementById('dataFinal').value;

            if(!dataFinal){
                document.getElementById('messageDateEndError').style.display = 'block';
            }else if(dataFinal){
                document.getElementById('messageDateEndError').style.display = 'none';
            }
        }