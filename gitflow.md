# Flujo de trabajo Gitflow

Este documento describe las principales ramas y reglas que se seguimos al utilizar Gitflow.

## Ramas Principales

### `main`

La rama `main` es la rama principal del proyecto y siempre debe contener la versión más estable y funcional del código. Las fusiones (merges) en esta rama deben realizarse solo cuando se ha probado y se ha confirmado que el código es estable y está listo para ser implementado.

### `developer`

La rama `developer` es la rama que contiene el código que está en desarrollo. Todas las características y cambios se fusionan primero en esta rama antes de ser promovidos a `main`.

## Ramas de apoyo

### `feature/{nombre-feature}`

Esta rama surge de `developer`para desarrollar nuevas funcionalidades y eventualmente se fusiona de nuevo en `developer` cuando la funcionalidad está completa y probada.

### `hotfix/{nombre-feature}`

Esta rama surge de `main` y se utiliza para resolver errores productivos de alta prioridad.

### `bugfix/{nombre-feature}`

Esta rama surge de `developer`y se utiliza para resolver errores de baja prioridad.

### `release/{nombre-feature}`

Esta rama surge de `main` y se utiliza para agrupar el código que debe pasar de `developer` a `main`.
