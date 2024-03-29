<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Auth\Events\Verified;

class EmailVerificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $userId = $this->route("id");

        $user = User::find($userId);


        if (!$user || !hash_equals(sha1($user->getEmailForVerification()), (string) $this->route('hash'))) {
            return false;
        }

        $this->user =$user;
        return true;
    }

    /**false
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
    public function fulfill(): void
    {
        if (!$this->user->hasVerifiedEmail()) {
            $this->user->markEmailAsVerified();

            event(new Verified($this->user));
        }
    }
}
