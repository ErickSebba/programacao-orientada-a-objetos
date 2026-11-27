import { Paciente } from './Paciente';
import { Medico } from './Medico';
import { Consulta } from './Consulta';
import { Receita } from './Receita';

let juniorjuca: Paciente;
let AnaMaria: Paciente;
let MariaJoana: Paciente;
let RenanSilva: Paciente;
let drHouse: Medico;
let drGrey: Medico;
let drBrown: Medico;
let consulta: Consulta;

beforeAll(() => {

    jest.useFakeTimers({advanceTimers: true, now : new Date(2024, 10, 13)});
    
    juniorjuca = new Paciente(1, "Junior Juca", "12345678910", "junin@gmail.com", ["Alergia ao pó"], ["Dor de cabeça", "Febre"]);
    AnaMaria = new Paciente(2, "Ana Maria", "98765432110", "anamaria@gmail.com", ["Alergia à Abelha"], ["Dor no Corpo", "Febre"]);
    MariaJoana = new Paciente(3, "Maria Joana", "12345678910", "mariajoana@gmail.com", [], ["Dor de Barriga"]);
    RenanSilva = new Paciente(4, "Renan Silva", "12345678910", "renansilva@gmail.com", ["Alergia à Amendoim"], ["Dor nas Costas", "Manchas Vermelhas ao redor do corpo"]);

    drHouse = new Medico(1, "House Casa", "12345678911", "drcasa@gmail.com", "123456", "Urologista");
    drGrey = new Medico(2, "Grey Cinza", "98765432111", "drgrey@gmail.com", "654321", "Cardiologista");
    drBrown = new Medico(3, "Brown Marrom", "12345678911", "drbrown@gmail.com", "234567", "Dermatologista");

});

describe('Casos teste consulta', () => {

    test('Teste marcar consulta', () => {
        consulta = new Consulta(new Date(2024, 10, 18), drHouse, juniorjuca);
        expect(consulta.medico).toBe(drHouse);
    });

    test('Teste marcar consulta inválida, tempo passado', () => {  
        try {
            consulta = new Consulta(new Date(2024, 10, 11), drHouse, MariaJoana);
        } catch (error) {

            expect(error.message).toBe("Data da consulta inválida");
        }
    });

    test('Teste marcar consulta com paciente sem alergia', () => {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, MariaJoana);
        expect(consulta.paciente).toBe(MariaJoana);
    });

    test('Teste marcar consulta com paciente com alergia', () => {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
        expect(consulta.paciente).toBe(juniorjuca);
    });

    test('Teste mudar o paciente de uma consulta já finalizada',()=> {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
        consulta.finalizarConsulta;
        try{
            consulta.paciente = AnaMaria
        }catch(error){
            expect(error.message).toBe("Consulta finalizada, não é possível alterar o paciente");
        }
    });

    test('Teste mudar o médico de uma consulta já finalizada',()=> {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
        consulta.finalizarConsulta;
        try{
            consulta.medico = drGrey
        }catch(error){
            expect(error.message).toBe("Consulta finalizada, não é possível alterar o médico");
        }
    });

    test('Teste finalizar consulta', () => {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
        consulta.finalizarConsulta(drHouse);
        expect(consulta._assinado).toBeTruthy();
    });

});

describe('Casos teste receita', () => {

    test('Tenta gerar receita', () => {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
        let receita = new Receita(consulta, ["Dipirona", "Paracetamol"],["Tarja vermelha", "Tarja amarela"]);
        receita.assinar(drHouse);
        expect(receita._assinado).toBeTruthy();
    });

    test('Tenta gerar receita sem remédio', () => {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
        try {
            let receita = new Receita(consulta, [],[]);
            receita.assinar(drHouse);
        } catch (error) {
            expect(error.message).toBe("A receita deve conter pelo menos um remédio");
        }
    });

    test('Tenta gerar receita com remedio invalido', () => {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
        try {
            let receita = new Receita(consulta, ["D", "Paracetamol", "Dipirona"],[]);
        } catch (error) {
            expect(error.message).toBe("Remédio inválido");
        }
    });

    test('Tenta gerar receita sem consulta', () => {
        try {
            let receita = new Receita(consulta,["Dipirona", "Paracetamol"],["Tarja vermelha", "Tarja amarela"]);
            receita.assinar(drHouse);
        } catch (error) {
            expect(error.message).toBe("Receita sem consulta");
        }
    });

    test('Paciente tenta assinar uma receita', () => {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
        let receita = new Receita(consulta, ["Dipirona", "Paracetamol"],["Tarja vermelha", "Tarja amarela"]);
        try {
            receita.assinar(juniorjuca);
        } catch (error) {
            expect(error.message).toBe("Acesso negado: Apenas médicos podem assinar esta receita");
        }
    });

    test('Medico tenta assinar uma receita', () => {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
        let receita = new Receita(consulta, ["Dipirona", "Paracetamol"], ["Tarja vermelha", "Tarja amarela"]);
        receita.assinar(drHouse);
        expect(receita._assinado).toBeTruthy();
        
    });
    
    test('Mudar remédio de uma receita já assinada', () => {
        consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
        let receita = new Receita(consulta, ["Dipirona", "Paracetamol"],["Tarja vermelha", "Tarja amarela"]);
        receita.assinar(drHouse);
        try {
            receita.remedios = ["Dorflex"];
        } catch (error) {
            expect(error.message).toBe("A receita já foi assinada");
        }
    });
});
describe('Casos teste Remedio', () => {

    test("Adicionar um dos remédios sem tarja", () => {
        try {
            consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
            let receita = new Receita(consulta, ["Dipirona", "Paracetamol", "Dorflex"],["Tarja vermelha", "Tarja amarela"]);
        } catch (error) {
            expect(error.message).toBe("Um dos remédio não possui tarja correspondente");
        }
    });

    test("Adiciona uma tarja sem vinculo a algum remédio", () => {
        try {
            consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
            let receita = new Receita(consulta, ["Dipirona", "Paracetamol"],["Tarja vermelha", "Tarja amarela", "Tarja preta"]);
        } catch (error) {
            expect(error.message).toBe("Um dos remédio não possui tarja correspondente");
        }
    });

    test("Adiciona mais de 3 remédios controlados", () => {
        try {
            consulta = new Consulta(new Date(2024, 10, 14), drHouse, juniorjuca);
            let receita = new Receita(consulta, ["Dipirona", "Paracetamol", "Dorflex", "Dorflex", "Dorflex"],["Tarja vermelha", "Tarja amarela", "Tarja preta", "Tarja preta", "Tarja preta"]);
        } catch (error) {
            expect(error.message).toBe("Receita com mais de 3 remédios controlados");
        }
    });


});

describe('Casos teste Medico', () => {
    
        test('Tentar gerar um Médico com CRM invalido', () => {
            try{
                let medico = new Medico(1, "Medico", "12345678911", "drcasa@gmail.com", "12345", "Urologista");
            }catch(error){
                expect(error.message).toBe("CRM deve ter exatamente 6 dígitos.");
            }
            
        });

        test('Tentar gerar um Médico com CRM valido', () => {
            let medico = new Medico(1, "Medico", "12345678911", "drcasa@gmail.com", "123456", "Urologista");
            expect(medico.crm).toBe("123456");
        });

});

describe('Casos teste Paciente', () => {

    
    test('Tenta gerar Paciente com Alergia invalida', () => {
        try{
            let paciente = new Paciente(1, "Paciente", "12345678911", "paciente@gmail.com", ["A"], ["Dor de cabeça"]);
    }catch(error){
        expect(error.message).toBe("Alergia inválida");
        }
    });
    
    test('Tenta gerar Paciente com Alergia valida', () => {
        let paciente = new Paciente(1, "Paciente", "12345678911", "paciente@gmail.com", ["Alergia"], ["Dor de cabeça"]);
        expect(paciente.alergias).toEqual(["Alergia"]);
    });

    test('Tenta gerar Paciente com Condição invalida', () => {
        try{
            let paciente = new Paciente(1, "Paciente", "12345678911", "paciente@gmail.com", ["Alergia"], ["Do"]);
        }catch(error){
            expect(error.message).toBe("Condição inválida");
        }
    });

    test('Tenta gerar Paciente com Condição valida', () => {
        let paciente = new Paciente(1, "Paciente", "12345678911", "paciente@gmail.com", ["Alergia"], ["Dor de cabeça"]);
        expect(paciente.condicoes).toEqual(["Dor de cabeça"]);
    });
});

describe('Casos teste Pessoa', () => {

    test('Tenta gerar Paciente com nome invalido', () => {
        try{
            let pessoa = new Paciente(1, "P", "123456789", "paciente@gmail.com", ["Alergia"], ["Dor de cabeça"]);
        }catch(error){
            expect(error.message).toBe("Nome Invalido");
        }
    });

    test('Tenta gerar Paciente com nome valido', () => {
        let pessoa = new Paciente(1, "Pessoa", "12345678910", "paciente@gmail.com", ["Alergia"], ["Dor de cabeça"]);
        expect(pessoa.nome).toBe("Pessoa");
    });

    test('Tenta gerar Paciente com CPF invalido', () => {
        try{
            let pessoa = new Paciente(1, "Pessoa", "1234567", "paciente@gmail.com", ["Alergia"], ["Dor de cabeça"]);
        }catch(error){
            expect(error.message).toBe("CPF inválido");
        }
    });

    test('Tenta gerar Paciente com CPF valido', () => {
        let pessoa = new Paciente(1, "Pessoa", "12345678910", "paciente@gmail.com", ["Alergia"], ["Dor de cabeça"]);
        expect(pessoa.cpf).toBe("12345678910");
    });

    test('Tenta gerar Paciente com email invalido', () => {
        try{
            let pessoa = new Paciente(1, "Pessoa", "12345678910", "pa", ["Alergia"], ["Dor de cabeça"]);
        }catch(error){
            expect(error.message).toBe("Email inválido");
        }
    });

    test('Tenta gerar Paciente com email sem @', () => {
        try{
            let pessoa = new Paciente(1, "Pessoa", "12345678910", "pacientegmail.com", ["Alergia"], ["Dor de cabeça"]);
        }catch(error){
            expect(error.message).toBe("Email inválido");
        }
    });

    test('Tenta gerar Paciente com email valido', () => {
        let pessoa = new Paciente(1, "Pessoa", "12345678910", "paciente@gmail.com", ["Alergia"], ["Dor de cabeça"]);
        expect(pessoa.email).toBe( "paciente@gmail.com");
    });

});
