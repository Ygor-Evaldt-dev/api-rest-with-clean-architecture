export function getSchemas() {
    return ({
        CreateUserDto: {
            type: "object",
            properties: {
                email: {
                    type: "string",
                    description: "E-mail válido",
                    require: true
                },
                password: {
                    type: "string",
                    description: "Senha forte para efetuar login",
                    require: true
                },
                name: {
                    type: "string",
                    description: "Nome do usuário",
                    require: false
                },

            }
        },
        UpdateUserDto: {
            type: "object",
            properties: {
                email: {
                    type: "string",
                    description: "E-mail válido",
                    require: false
                },
                password: {
                    type: "string",
                    description: "Senha forte para efetuar login",
                    require: false
                },
                name: {
                    type: "string",
                    description: "Nome do usuário",
                    require: false
                },

            }
        },
        CreateTaskDto: {
            type: "object",
            properties: {
                title: {
                    type: "string",
                    description: "Título da tarefa",
                    require: true
                },
                description: {
                    type: "string",
                    description: "Descrição com detalhes da tarefa",
                    require: false
                },
                status: {
                    type: "string",
                    description: "'pendente', 'em andamento' ou 'concluído'",
                    require: false
                }
            }
        },
        UpdateTaskDto: {
            type: "object",
            properties: {
                title: {
                    type: "string",
                    description: "Título da tarefa",
                    require: false
                },
                description: {
                    type: "string",
                    description: "Descrição com detalhes da tarefa",
                    require: false
                },
                status: {
                    type: "string",
                    description: "'pendente', 'em andamento' ou 'concluído'",
                    require: false
                }
            }
        },
        FilterTaskDto: {
            type: "object",
            properties: {
                title: {
                    type: "string",
                    description: "Título parcial ou completo da tarefa",
                    require: false
                },
                status: {
                    type: "string",
                    description: "'pendente', 'em andamento' ou 'concluído'",
                    require: false
                }
            }
        }
    })
}