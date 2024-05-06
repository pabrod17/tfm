import android.content.Context
import android.content.SharedPreferences
import javax.inject.Inject

class TokenManager @Inject constructor(val context: Context) {

    private  val TOKEN_PREFS_NAME = "TokenPrefs"
    private  val KEY_AUTH_TOKEN = "authToken"
    private  val USER_ID = "userId"

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

//    fun clearAuthToken() {
//        val editor = sharedPreferences.edit()
//        editor.remove(KEY_AUTH_TOKEN)
//        editor.apply()
//    }
}