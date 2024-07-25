#include <stdio.h>
#include <pthread.h>
#include <stdbool.h>

#define NUM_ITERATIONS 10

// Variáveis globais para o algoritmo de Peterson
bool flag[2];
int turn;
int shared_resource = 0;

void* process0(void* arg) {
    for (int i = 0; i < NUM_ITERATIONS; i++) {
        // Protocolo de entrada
        flag[0] = true;
        turn = 1;
        while (flag[1] && turn == 1);

        // Seção crítica
        shared_resource++;
        printf("Processo 0, Iteração %d, Recurso compartilhado: %d\n", i, shared_resource);

        // Protocolo de saída
        flag[0] = false;

        // Seção não-crítica
    }
    return NULL;
}

void* process1(void* arg) {
    for (int i = 0; i < NUM_ITERATIONS; i++) {
        // Protocolo de entrada
        flag[1] = true;
        turn = 0;
        while (flag[0] && turn == 0);

        // Seção crítica
        shared_resource++;
        printf("Processo 1, Iteração %d, Recurso compartilhado: %d\n", i, shared_resource);

        // Protocolo de saída
        flag[1] = false;

        // Seção não-crítica
    }
    return NULL;
}

int main() {
    pthread_t thread0, thread1;

    // Inicializando as variáveis de controle
    flag[0] = flag[1] = false;
    turn = 0;

    // Criando as threads
    pthread_create(&thread0, NULL, process0, NULL);
    pthread_create(&thread1, NULL, process1, NULL);

    // Aguardando as threads terminarem
    pthread_join(thread0, NULL);
    pthread_join(thread1, NULL);

    printf("Recurso compartilhado final: %d\n", shared_resource);

    return 0;
}
