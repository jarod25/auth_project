<template>
  <div class="login">
    <div class="login__container">
      <div class="login__container__title">
        <h1>Log In</h1>
      </div>
      <div class="login__container__form">
        <form action="/auth/login">
          <div class="login__container__form__input">
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
          </div>
          <div class="login__container__form__input">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
          </div>
          <div class="login__container__form__input">
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogInComponent",
}
</script>

<style scoped>

</style>