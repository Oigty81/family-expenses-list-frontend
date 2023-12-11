<template>
  <div class="row q-mt-xl">
    <div class="col q-mx-xl">
      <q-btn
        style="width: 100%"
        outline
        color="info"
        label="Edit Category"
        to="/edit-category"
        size="xl"
      />
    </div>
    <div class="col q-mx-xl">
      <q-btn
        style="width: 100%"
        outline
        color="info"
        label="Edit Category Composition"
        to="/edit-category-composition"
        size="xl"
      />
    </div>
  </div>
  <div class="row q-mt-xl">
    <div class="col q-mx-xl">
      <q-btn
        style="width: 100%"
        outline
        color="info"
        label="Add Expenses"
        to="/add-expenses"
        size="xl"
      />
    </div>
    <div class="col q-mx-xl">
      <q-btn
        style="width: 100%"
        outline
        color="info"
        label="Show Expenses (Time-Period)"
        to="/view-expenses-simple"
        size="xl"
      />
    </div>
  </div>
</template>