class Aluno {
    constructor(nome, idade, curso, nota) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.nota = nota;
    }
}

class AlunoController {
    constructor() {
        this.alunos = [];
        this.editIndex = -1;
        this.form = document.getElementById("formAluno");
        this.tabela = document.getElementById("tabela");
        this.resultado = document.getElementById("resultado");
        this.tabelaResultado = document.getElementById("tabelaResultado");
        this.cabecalhoResultado = document.getElementById("cabecalhoResultado");
        this.init();
    }

    init() {
        this.form.addEventListener("submit", (e) => this.cadastrar(e));

        // Botões extras
        document.getElementById("btnAprovados").addEventListener("click", () => this.listarAprovados());
        document.getElementById("btnMediaNotas").addEventListener("click", () => this.mediaNotas());
        document.getElementById("btnMediaIdades").addEventListener("click", () => this.mediaIdades());
        document.getElementById("btnOrdemAlfabetica").addEventListener("click", () => this.ordenarAlfabetica());
        document.getElementById("btnQtdPorCurso").addEventListener("click", () => this.qtdPorCurso());
    }

    cadastrar(e) {
        e.preventDefault();

        let nome = document.getElementById("idnome").value.trim();
        let idade = parseInt(document.getElementById("ididade").value);
        let curso = document.getElementById("idcurso").value;
        let nota = parseFloat(document.getElementById("idnota").value);

        if (!nome || isNaN(idade) || isNaN(nota)) {
            alert("Preencha todos os campos corretamente!");
            return;
        }

        const aluno = new Aluno(nome, idade, curso, nota);

        if (this.editIndex === -1) {
            this.alunos.push(aluno);
        } else {
            this.alunos[this.editIndex] = aluno;
            this.editIndex = -1;
        }

        this.atualizarTabela();
        this.limparFormulario();
    }

    atualizarTabela(lista = this.alunos) {
        this.tabela.innerHTML = "";
        lista.forEach((aluno, index) => {
            const row = this.tabela.insertRow();

            row.insertCell(0).innerText = aluno.nome;
            row.insertCell(1).innerText = aluno.idade;
            row.insertCell(2).innerText = aluno.curso;
            row.insertCell(3).innerText = aluno.nota.toFixed(1);

            const acoes = row.insertCell(4);
            acoes.innerHTML = `
                <button class="btn btn-warning btn-sm me-2" onclick="controller.editarAluno(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="controller.excluirAluno(${index})">Excluir</button>
            `;
        });
    }

    editarAluno(index) {
        const aluno = this.alunos[index];
        document.getElementById("idnome").value = aluno.nome;
        document.getElementById("ididade").value = aluno.idade;
        document.getElementById("idcurso").value = aluno.curso;
        document.getElementById("idnota").value = aluno.nota;
        this.editIndex = index;
    }

    excluirAluno(index) {
        if (confirm("Tem certeza que deseja excluir este aluno?")) {
            this.alunos.splice(index, 1);
            this.atualizarTabela();
        }
    }

    limparFormulario() {
        this.form.reset();
    }

    limparResultado() {
        this.resultado.innerHTML = "";
        this.tabelaResultado.innerHTML = "";
        this.cabecalhoResultado.innerHTML = "";
    }

    // ---- 📘 FUNCIONALIDADES EXTRAS ----

    listarAprovados() {
        this.limparResultado();
        const aprovados = this.alunos.filter(a => a.nota >= 7);

        this.resultado.innerHTML = `<div class="alert alert-success">Lista de alunos aprovados:</div>`;

        this.cabecalhoResultado.innerHTML = `
            <th>Nome</th><th>Curso</th><th>Nota</th>
        `;

        if (aprovados.length === 0) {
            this.tabelaResultado.innerHTML = `<tr><td colspan="3">Nenhum aluno aprovado</td></tr>`;
            return;
        }

        aprovados.forEach(a => {
            const row = this.tabelaResultado.insertRow();
            row.insertCell(0).innerText = a.nome;
            row.insertCell(1).innerText = a.curso;
            row.insertCell(2).innerText = a.nota.toFixed(1);
        });
    }

    ordenarAlfabetica() {
        this.limparResultado();
        const ordenados = [...this.alunos].sort((a, b) => a.nome.localeCompare(b.nome));

        this.resultado.innerHTML = `<div class="alert alert-info">Alunos em ordem alfabética:</div>`;
        this.cabecalhoResultado.innerHTML = `
            <th>Nome</th><th>Curso</th><th>Nota</th>
        `;

        if (ordenados.length === 0) {
            this.tabelaResultado.innerHTML = `<tr><td colspan="3">Nenhum aluno cadastrado</td></tr>`;
            return;
        }

        ordenados.forEach(a => {
            const row = this.tabelaResultado.insertRow();
            row.insertCell(0).innerText = a.nome;
            row.insertCell(1).innerText = a.curso;
            row.insertCell(2).innerText = a.nota.toFixed(1);
        });
    }

    qtdPorCurso() {
        this.limparResultado();
        const cursos = ["JavaScript", "Python", "Java"]; // mostra todos, mesmo se 0
        const contagem = { JavaScript: 0, Python: 0, Java: 0 };

        this.alunos.forEach(a => {
            contagem[a.curso]++;
        });

        this.resultado.innerHTML = `<div class="alert alert-warning">Quantidade de alunos por curso:</div>`;
        this.cabecalhoResultado.innerHTML = `<th>Curso</th><th>Quantidade</th>`;

        cursos.forEach(curso => {
            const row = this.tabelaResultado.insertRow();
            row.insertCell(0).innerText = curso;
            row.insertCell(1).innerText = contagem[curso];
        });
    }

    mediaNotas() {
        this.limparResultado();

        if (this.alunos.length === 0) {
            this.resultado.innerHTML = `<div class="alert alert-info">Nenhum aluno cadastrado.</div>`;
            return;
        }

        const soma = this.alunos.reduce((acc, a) => acc + a.nota, 0);
        const media = soma / this.alunos.length;
        this.resultado.innerHTML = `<div class="alert alert-primary">Média das notas: <b>${media.toFixed(2)}</b></div>`;
    }

    mediaIdades() {
        this.limparResultado();

        if (this.alunos.length === 0) {
            this.resultado.innerHTML = `<div class="alert alert-info">Nenhum aluno cadastrado.</div>`;
            return;
        }

        const soma = this.alunos.reduce((acc, a) => acc + a.idade, 0);
        const media = soma / this.alunos.length;
        this.resultado.innerHTML = `<div class="alert alert-secondary">Média das idades: <b>${media.toFixed(1)}</b> anos</div>`;
    }
}

const controller = new AlunoController();
