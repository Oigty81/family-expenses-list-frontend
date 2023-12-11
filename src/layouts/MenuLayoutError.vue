<script setup>

</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      class="bg-primary text-white"
      height-hint="98"
    >
      <div class="row">
        <q-toolbar class="col-6">
          <q-toolbar-title>
            <q-avatar>
              <img src="@/assets/logo.png">
            </q-avatar>
            Error: App Layout not configured
          </q-toolbar-title>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container>
      <p>Please set Layout in ".env"-file for Web or Mobile-App </p>
      <p># Layout </p>
      <p>VITE_LOCAL_LAYOUT=Web</p>
      <p>..OR..</p>
      <p>VITE_LOCAL_LAYOUT=App</p>
    </q-page-container>
  </q-layout>
</template>
