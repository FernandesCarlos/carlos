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
        this.init();
    }

    init() {
        this.form.addEventListener("submit", (e) => this.cadastrar(e));
    }

    cadastrar(e) {
        e.preventDefault();

        let nome = document.getElementById("idnome").value.trim();
        let idade = parseInt(document.getElementById("ididade").value);
        let curso = document.getElementById("idcurso").value;
        let nota = parseFloat(document.getElementById("idnota").value);

        // validação simples
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

    atualizarTabela() {
        this.tabela.innerHTML = "";

        this.alunos.forEach((aluno, index) => {
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
}

// Instancia o controller globalmente
const controller = new AlunoController();