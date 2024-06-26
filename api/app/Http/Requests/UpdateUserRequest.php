<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $this->user,
            'about' => 'string|max:120',
            'picture' => 'image|mimes:jpeg,png,jpg|max:2048',
            'location_id' => 'integer|exists:locations,id',
            'availability_id' => 'exists:availabilities,id',
            'experience_id' => 'exists:experiences,id',
            'instrument_id' => 'exists:instruments,id',
            'venue_type_id' => 'exists:venue_types,id',
            'genres' => 'array',
            'genres.*' => 'exists:genres,id',
            'current_password' => 'required_with:new_password|string',
            'new_password' => 'nullable|string|min:6|confirmed',
            'new_password_confirmation' => 'nullable|string|min:8',
        ];
    }

    public function messages()
    {
        return [
            'current_password.required_with' => 'The current password is required when changing the password.',
            'new_password.confirmed' => 'The new password confirmation does not match.',
        ];
    }
}
