#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

#define NUM_PHILOSOPHERS 5

pthread_mutex_t forks[NUM_PHILOSOPHERS]; // Mutex para cada garfo

void* philosopher(void* arg) {
    int id = *((int*)arg);
    free(arg); // Libera a memória alocada para o argumento

    int left = id; // Garfo à esquerda do filósofo
    int right = (id + 1) % NUM_PHILOSOPHERS; // Garfo à direita do filósofo

    while (1) {
        // Pensar
        printf("Filósofo %d está pensando...\n", id);
        sleep(rand() % 3 + 1); // Simula o tempo de pensar

        // Evitar deadlock pegando primeiro o garfo de menor id
        if (id % 2 == 0) {
            pthread_mutex_lock(&forks[left]);
            printf("Filósofo %d pegou o garfo %d (esquerda).\n", id, left);
            pthread_mutex_lock(&forks[right]);
            printf("Filósofo %d pegou o garfo %d (direita).\n", id, right);
        } else {
            pthread_mutex_lock(&forks[right]);
            printf("Filósofo %d pegou o garfo %d (direita).\n", id, right);
            pthread_mutex_lock(&forks[left]);
            printf("Filósofo %d pegou o garfo %d (esquerda).\n", id, left);
        }

        // Comer
        printf("Filósofo %d está comendo...\n", id);
        sleep(rand() % 3 + 1); // Simula o tempo de comer

        // Soltar garfos
        pthread_mutex_unlock(&forks[left]);
        pthread_mutex_unlock(&forks[right]);
        printf("Filósofo %d soltou os garfos %d e %d.\n", id, left, right);
    }

    pthread_exit(NULL);
}

int main() {
    pthread_t philosophers[NUM_PHILOSOPHERS];
    
    // Inicializa os mutexes dos garfos
    for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
        pthread_mutex_init(&forks[i], NULL);
    }

    // Cria as threads dos filósofos
    for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
        int* id = malloc(sizeof(int));
        *id = i;
        if (pthread_create(&philosophers[i], NULL, philosopher, (void*)id) != 0) {
            perror("pthread_create");
            exit(EXIT_FAILURE);
        }
    }

    // Espera todas as threads terminarem (nunca vai acontecer neste exemplo)
    for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
        pthread_join(philosophers[i], NULL);
    }

    // Destroi os mutexes dos garfos
    for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
        pthread_mutex_destroy(&forks[i]);
    }

    return 0;
}
