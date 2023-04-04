<template>
  <div class="signup">
    <div class="signup__container">
      <div class="signup__container__title">
        <h1>Sign Up</h1>
      </div>
      <div class="signup__container__form">
        <form action="/auth/signup">
          <div class="signup__container__form__input">
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
          </div>
          <div class="signup__container__form__input">
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
          </div>
          <div class="signup__container__form__input">
            <label for="password">Confirm Password</label>
            <input type="password" name="password" id="password">
          </div>
          <div class="signup__container__form__input">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpComponent"
}
</script>

<style scoped>

</style>