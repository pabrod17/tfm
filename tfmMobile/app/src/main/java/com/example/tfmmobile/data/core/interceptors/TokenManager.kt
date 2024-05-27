import android.content.Context
import android.content.SharedPreferences
import javax.inject.Inject

class TokenManager @Inject constructor(val context: Context) {

    private  val TOKEN_PREFS_NAME = "TokenPrefs"
    private  val KEY_AUTH_TOKEN = "authToken"
    private  val USER_ID = "userId"
    private  val USER_NAME = "userName"
    private  val USER_FIRST_NAME = "userFirstName"
    private  val USER_SURNAMES = "userSurnames"
    private  val USER_EMAIL = "userEmail"
    private  val USER_PASSWORD = "userPassword"
    private  val LOGIN_STATE = "loginState"

    val storage = context.getSharedPreferences(TOKEN_PREFS_NAME, 0)

//    fun initialize(context: Context) {
//        sharedPreferences = context.getSharedPreferences(TOKEN_PREFS_NAME, Context.MODE_PRIVATE)
//    }

    fun saveAuthToken(authToken: String) {
//        val editor = sharedPreferences.edit()
//        editor.putString(KEY_AUTH_TOKEN, authToken)
//        editor.apply()

        storage.edit().putString(KEY_AUTH_TOKEN, authToken).apply()
    }

    fun removeAuthToken() {
        storage.edit().remove(KEY_AUTH_TOKEN).apply()
    }

    fun getAuthToken(): String? {
//        return sharedPreferences.getString(KEY_AUTH_TOKEN, null)
        return storage.getString(KEY_AUTH_TOKEN, "")
    }

    fun saveUserId(userId: String) {
//        val editor = sharedPreferences.edit()
//        editor.putString(KEY_AUTH_TOKEN, authToken)
//        editor.apply()

        storage.edit().putString(USER_ID, userId).apply()
    }

    fun removeUserId() {
        storage.edit().remove(USER_ID).apply()
    }

    fun getUserId(): String? {
//        return sharedPreferences.getString(KEY_AUTH_TOKEN, null)
        return storage.getString(USER_ID, "")
    }





    fun saveUserName(userName: String) {
//        val editor = sharedPreferences.edit()
//        editor.putString(KEY_AUTH_TOKEN, authToken)
//        editor.apply()

        storage.edit().putString(USER_NAME, userName).apply()
    }

    fun removeUserName() {
        storage.edit().remove(USER_NAME).apply()
    }

    fun getUserName(): String? {
//        return sharedPreferences.getString(KEY_AUTH_TOKEN, null)
        return storage.getString(USER_NAME, "")
    }

    fun saveUserFirstName(userName: String) {
//        val editor = sharedPreferences.edit()
//        editor.putString(KEY_AUTH_TOKEN, authToken)
//        editor.apply()

        storage.edit().putString(USER_FIRST_NAME, userName).apply()
    }

    fun removeUserFirstName() {
        storage.edit().remove(USER_FIRST_NAME).apply()
    }

    fun getUserFirstName(): String? {
//        return sharedPreferences.getString(KEY_AUTH_TOKEN, null)
        return storage.getString(USER_FIRST_NAME, "")
    }

    fun saveUserSurnames(userName: String) {
//        val editor = sharedPreferences.edit()
//        editor.putString(KEY_AUTH_TOKEN, authToken)
//        editor.apply()

        storage.edit().putString(USER_SURNAMES, userName).apply()
    }

    fun removeUserSurnames() {
        storage.edit().remove(USER_SURNAMES).apply()
    }

    fun getUserSurnames(): String? {
//        return sharedPreferences.getString(KEY_AUTH_TOKEN, null)
        return storage.getString(USER_SURNAMES, "")
    }

    fun saveUserEmail(userName: String) {
//        val editor = sharedPreferences.edit()
//        editor.putString(KEY_AUTH_TOKEN, authToken)
//        editor.apply()

        storage.edit().putString(USER_EMAIL, userName).apply()
    }

    fun removeUserEmail() {
        storage.edit().remove(USER_EMAIL).apply()
    }

    fun getUserEmail(): String? {
//        return sharedPreferences.getString(KEY_AUTH_TOKEN, null)
        return storage.getString(USER_EMAIL, "")
    }

    fun saveUserPassword(userName: String) {
//        val editor = sharedPreferences.edit()
//        editor.putString(KEY_AUTH_TOKEN, authToken)
//        editor.apply()

        storage.edit().putString(USER_PASSWORD, userName).apply()
    }

    fun removeUserPassword() {
        storage.edit().remove(USER_PASSWORD).apply()
    }

    fun getUserPassword(): String? {
//        return sharedPreferences.getString(KEY_AUTH_TOKEN, null)
        return storage.getString(USER_PASSWORD, "")
    }




















    fun saveLoginState(state: String) {
        storage.edit().putString(LOGIN_STATE, state).apply()
    }

    fun removeLoginState() {
        storage.edit().remove(LOGIN_STATE).apply()
    }

    fun getLoginState(): String? {
//        return sharedPreferences.getString(KEY_AUTH_TOKEN, null)
        return storage.getString(LOGIN_STATE, "")
    }

//    fun clearAuthToken() {
//        val editor = sharedPreferences.edit()
//        editor.remove(KEY_AUTH_TOKEN)
//        editor.apply()
//    }
}