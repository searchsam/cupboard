@component('mail::message')
# New Order Created

{{ $order->user->name }} created a new {{ $order->name }} Order to expire on {{ $order->deadline }}.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
